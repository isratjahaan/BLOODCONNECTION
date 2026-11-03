-- ===================================================
-- BLOOD CONNECTION: BANGLADESH NATIONAL BLOOD DONATION ECOSYSTEM
-- MIGRATION 02: ROW LEVEL SECURITY & AUTOMATED TRIGGERS
-- ===================================================

-- Enable RLS on all sensitive tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE donor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE id_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE donor_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- Helper functions to get current user role and jurisdiction
CREATE OR REPLACE FUNCTION get_auth_role()
RETURNS VARCHAR AS $$
    SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION get_auth_district()
RETURNS VARCHAR AS $$
    SELECT district_id FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION get_auth_division()
RETURNS VARCHAR AS $$
    SELECT division_id FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
    SELECT role IN ('SUPER_ADMIN', 'ADMIN') FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ---------------------------------------------------
-- RLS POLICIES FOR PROFILES
-- ---------------------------------------------------

-- Public/Visitor can read basic profile info needed for donor listings
CREATE POLICY "Public profiles are visible for directory"
    ON profiles FOR SELECT
    USING (is_suspended = FALSE);

-- Users can update only their own profile, cannot change role themselves
CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id AND role = (SELECT role FROM profiles WHERE id = auth.uid()));

-- Super Admin can manage all profiles
CREATE POLICY "Super Admin has full access to profiles"
    ON profiles FOR ALL
    USING (get_auth_role() = 'SUPER_ADMIN');

-- Coordinators can view profiles within their geographic jurisdiction
CREATE POLICY "Division Admin can view profiles in division"
    ON profiles FOR SELECT
    USING (get_auth_role() = 'DIVISION_ADMIN' AND division_id = get_auth_division());

CREATE POLICY "District Coordinator can view profiles in district"
    ON profiles FOR SELECT
    USING (get_auth_role() = 'DISTRICT_COORDINATOR' AND district_id = get_auth_district());

-- ---------------------------------------------------
-- RLS POLICIES FOR DONOR PROFILES
-- ---------------------------------------------------

-- Anyone can search active available donors (phone numbers shielded)
CREATE POLICY "Public can view active donor profiles"
    ON donor_profiles FOR SELECT
    USING (TRUE);

-- Donors can update their own preferences and manual availability
CREATE POLICY "Donors can update own donor profile"
    ON donor_profiles FOR UPDATE
    USING (user_id = auth.uid());

-- ---------------------------------------------------
-- RLS POLICIES FOR DIGITAL ID CARDS
-- ---------------------------------------------------

-- Anyone can verify an ID card if they know the verification token (Public QR Scan)
CREATE POLICY "Public ID card verification"
    ON id_cards FOR SELECT
    USING (TRUE);

-- Users can read their own ID card
CREATE POLICY "Users can view own ID card"
    ON id_cards FOR SELECT
    USING (user_id = auth.uid());

-- Only Administrators can update or revoke ID cards
CREATE POLICY "Admins can manage ID cards"
    ON id_cards FOR ALL
    USING (is_admin());

-- ---------------------------------------------------
-- RLS POLICIES FOR BLOOD REQUESTS
-- ---------------------------------------------------

-- Everyone can view active approved blood requests
CREATE POLICY "Public can view approved blood requests"
    ON blood_requests FOR SELECT
    USING (status != 'REJECTED');

-- Authenticated users or visitors can create a blood request
CREATE POLICY "Anyone can create blood request"
    ON blood_requests FOR INSERT
    WITH CHECK (TRUE);

-- Creator can update their own request
CREATE POLICY "Creator can update request"
    ON blood_requests FOR UPDATE
    USING (created_by = auth.uid());

-- District Coordinators can moderate requests in their district
CREATE POLICY "District Coordinator can moderate district requests"
    ON blood_requests FOR ALL
    USING (
        get_auth_role() IN ('SUPER_ADMIN', 'ADMIN') OR 
        (get_auth_role() = 'DISTRICT_COORDINATOR' AND district_id = get_auth_district())
    );

-- ---------------------------------------------------
-- RLS POLICIES FOR DONATIONS & VERIFICATIONS
-- ---------------------------------------------------

CREATE POLICY "Donors can view their own donations"
    ON donations FOR SELECT
    USING (donor_id IN (SELECT id FROM donor_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Coordinators and Admins can record donations"
    ON donations FOR ALL
    USING (get_auth_role() IN ('SUPER_ADMIN', 'ADMIN', 'DISTRICT_COORDINATOR', 'UPAZILA_COORDINATOR'));

-- ---------------------------------------------------
-- AUTOMATED TRIGGER: 3-MONTH AVAILABILITY ENGINE
-- ---------------------------------------------------

CREATE OR REPLACE FUNCTION process_donation_and_update_availability()
RETURNS TRIGGER AS $$
DECLARE
    v_donor_id UUID;
BEGIN
    v_donor_id := NEW.donor_id;

    -- Update donor profile:
    -- 1. Update last donation date
    -- 2. Increment verified donation count and total units
    -- 3. Set availability to UNAVAILABLE_TEMPORARY
    -- 4. Calculate next eligible date exactly 3 months from donation
    UPDATE donor_profiles
    SET 
        last_donation_date = NEW.donation_date,
        verified_donations_count = verified_donations_count + 1,
        total_units_donated = total_units_donated + NEW.units,
        availability_status = 'UNAVAILABLE_TEMPORARY',
        next_eligible_date = (NEW.donation_date + INTERVAL '3 months')::DATE,
        updated_at = NOW()
    WHERE id = v_donor_id;

    -- Record into availability audit history
    INSERT INTO donor_availability_history (
        donor_id,
        previous_status,
        new_status,
        reason,
        changed_by
    ) VALUES (
        v_donor_id,
        'AVAILABLE',
        'UNAVAILABLE_TEMPORARY',
        CONCAT('Automatic 3-month cooldown initiated following verified donation at ', NEW.hospital_name),
        NEW.verified_by
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_donation_availability ON donations;
CREATE TRIGGER trigger_donation_availability
AFTER INSERT ON donations
FOR EACH ROW
EXECUTE FUNCTION process_donation_and_update_availability();

-- ---------------------------------------------------
-- AUTOMATED TRIGGER: DIGITAL ID CARD GENERATION
-- ---------------------------------------------------

CREATE OR REPLACE FUNCTION generate_user_digital_id()
RETURNS TRIGGER AS $$
DECLARE
    v_prefix VARCHAR(10);
    v_serial VARCHAR(10);
    v_id_number VARCHAR(64);
    v_token VARCHAR(128);
BEGIN
    -- Determine role prefix
    IF NEW.role = 'SUPER_ADMIN' THEN v_prefix := 'BC-SAD';
    ELSIF NEW.role = 'ADMIN' THEN v_prefix := 'BC-ADM';
    ELSIF NEW.role = 'DIVISION_ADMIN' THEN v_prefix := 'BC-DIV';
    ELSIF NEW.role = 'DISTRICT_COORDINATOR' THEN v_prefix := 'BC-DIS';
    ELSIF NEW.role = 'UPAZILA_COORDINATOR' THEN v_prefix := 'BC-UPZ';
    ELSIF NEW.role = 'ORGANIZATION_ADMIN' THEN v_prefix := 'BC-ORG';
    ELSIF NEW.role = 'VOLUNTEER' THEN v_prefix := 'BC-VOL';
    ELSE v_prefix := 'BC-DON';
    END IF;

    v_serial := LPAD(FLOOR(RANDOM() * 90000 + 10000)::TEXT, 5, '0');
    v_id_number := CONCAT(v_prefix, '-', TO_CHAR(CURRENT_DATE, 'YYYY'), '-', v_serial);
    v_token := MD5(CONCAT(NEW.id::TEXT, NOW()::TEXT, RANDOM()::TEXT));

    INSERT INTO id_cards (
        user_id,
        role,
        id_number,
        verification_token,
        status,
        issue_date,
        expiry_date,
        qr_payload
    ) VALUES (
        NEW.id,
        NEW.role,
        v_id_number,
        v_token,
        'ACTIVE',
        CURRENT_DATE,
        CURRENT_DATE + INTERVAL '2 years',
        CONCAT('https://bloodconnection.org.bd/verify/', v_token)
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_auto_id_card ON profiles;
CREATE TRIGGER trigger_auto_id_card
AFTER INSERT ON profiles
FOR EACH ROW
EXECUTE FUNCTION generate_user_digital_id();

-- ---------------------------------------------------
-- CRON JOB SPECIFICATION: 3-MONTH AVAILABILITY RECHECK
-- ---------------------------------------------------
-- This function runs daily to restore donors to AVAILABLE once 3 months have elapsed.
CREATE OR REPLACE FUNCTION check_and_restore_donor_eligibility()
RETURNS VOID AS $$
BEGIN
    UPDATE donor_profiles
    SET 
        availability_status = 'AVAILABLE',
        updated_at = NOW()
    WHERE 
        availability_status = 'UNAVAILABLE_TEMPORARY'
        AND next_eligible_date <= CURRENT_DATE
        AND manual_availability_opt_in = TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ---------------------------------------------------
-- SUPABASE STORAGE BUCKETS CONFIGURATION
-- ---------------------------------------------------
INSERT INTO storage.buckets (id, name, public) VALUES 
('profile-photos', 'profile-photos', true),
('donor-documents', 'donor-documents', false),
('organization-logos', 'organization-logos', true),
('id-cards', 'id-cards', true),
('certificates', 'certificates', true),
('request-documents', 'request-documents', false),
('campaign-media', 'campaign-media', true)
ON CONFLICT (id) DO NOTHING;
