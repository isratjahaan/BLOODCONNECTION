-- =========================================================================
-- BLOOD CONNECTION: MASTER COMPLETE DATABASE SETUP SCRIPT
-- RUN THIS SCRIPT IN SUPABASE SQL EDITOR TO SETUP ALL TABLES & SEED DATA
-- =========================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. DIVISIONS
CREATE TABLE IF NOT EXISTS divisions (
    id VARCHAR(32) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    bn_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. DISTRICTS
CREATE TABLE IF NOT EXISTS districts (
    id VARCHAR(32) PRIMARY KEY,
    division_id VARCHAR(32) REFERENCES divisions(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    bn_name VARCHAR(100) NOT NULL,
    lat NUMERIC(9, 6),
    lng NUMERIC(9, 6),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. UPAZILAS / THANAS
CREATE TABLE IF NOT EXISTS upazilas (
    id VARCHAR(64) PRIMARY KEY,
    district_id VARCHAR(32) REFERENCES districts(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    bn_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. USER PROFILES
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    bn_name VARCHAR(255),
    role VARCHAR(32) NOT NULL DEFAULT 'DONOR' CHECK (
        role IN (
            'SUPER_ADMIN', 'ADMIN', 'DIVISION_ADMIN',
            'DISTRICT_COORDINATOR', 'UPAZILA_COORDINATOR',
            'ORGANIZATION_ADMIN', 'VOLUNTEER', 'DONOR', 'VISITOR'
        )
    ),
    phone VARCHAR(20) NOT NULL,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    avatar_url TEXT,
    division_id VARCHAR(32) REFERENCES divisions(id),
    district_id VARCHAR(32) REFERENCES districts(id),
    upazila_id VARCHAR(64) REFERENCES upazilas(id),
    address TEXT,
    assigned_jurisdiction TEXT,
    is_verified BOOLEAN DEFAULT TRUE,
    is_suspended BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. DONOR PROFILES
CREATE TABLE IF NOT EXISTS donor_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    blood_group VARCHAR(5) NOT NULL CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    rh_factor VARCHAR(1) NOT NULL CHECK (rh_factor IN ('+', '-')),
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
    last_donation_date DATE,
    next_eligible_date DATE,
    availability_status VARCHAR(32) NOT NULL DEFAULT 'AVAILABLE' CHECK (
        availability_status IN ('AVAILABLE', 'UNAVAILABLE_TEMPORARY', 'UNAVAILABLE_PERMANENT', 'PENDING_RECHECK')
    ),
    manual_availability_opt_in BOOLEAN DEFAULT TRUE,
    verified_donations_count INT DEFAULT 0,
    total_units_donated INT DEFAULT 0,
    average_rating NUMERIC(3, 2) DEFAULT 5.0,
    reviews_count INT DEFAULT 0,
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20),
    preferred_contact_method VARCHAR(20) DEFAULT 'phone',
    is_available_for_emergency BOOLEAN DEFAULT TRUE,
    medical_warning_acknowledged BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. DIGITAL ID CARDS
CREATE TABLE IF NOT EXISTS id_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role VARCHAR(32) NOT NULL,
    id_number VARCHAR(64) UNIQUE NOT NULL,
    verification_token VARCHAR(128) UNIQUE NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'SUSPENDED', 'EXPIRED', 'REVOKED', 'PENDING')),
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    expiry_date DATE,
    qr_payload TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. BLOOD REQUESTS
CREATE TABLE IF NOT EXISTS blood_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    patient_name VARCHAR(255) NOT NULL,
    blood_group VARCHAR(5) NOT NULL CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    required_units INT NOT NULL CHECK (required_units > 0),
    fulfilled_units INT DEFAULT 0,
    hospital_name VARCHAR(255) NOT NULL,
    hospital_address TEXT NOT NULL,
    division_id VARCHAR(32) REFERENCES divisions(id),
    district_id VARCHAR(32) REFERENCES districts(id),
    upazila_id VARCHAR(64) REFERENCES upazilas(id),
    required_date DATE NOT NULL,
    required_time TIME NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    urgency VARCHAR(20) NOT NULL DEFAULT 'URGENT' CHECK (urgency IN ('CRITICAL', 'URGENT', 'NORMAL')),
    additional_notes TEXT,
    status VARCHAR(32) NOT NULL DEFAULT 'MATCHING' CHECK (
        status IN ('PENDING', 'UNDER_REVIEW', 'APPROVED', 'MATCHING', 'PARTIALLY_FULFILLED', 'FULFILLED', 'REJECTED', 'CANCELLED', 'EXPIRED')
    ),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. DONATIONS RECORD
CREATE TABLE IF NOT EXISTS donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_id UUID REFERENCES donor_profiles(id) ON DELETE CASCADE,
    request_id UUID REFERENCES blood_requests(id) ON DELETE SET NULL,
    hospital_name VARCHAR(255) NOT NULL,
    district_id VARCHAR(32) REFERENCES districts(id),
    units INT NOT NULL DEFAULT 1,
    donation_date DATE NOT NULL,
    certificate_number VARCHAR(64) UNIQUE,
    verified_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. DONOR REVIEWS
CREATE TABLE IF NOT EXISTS donor_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_id UUID REFERENCES donor_profiles(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT NOT NULL,
    is_verified_interaction BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. ORGANIZATIONS
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    bn_name VARCHAR(255),
    type VARCHAR(50) NOT NULL CHECK (type IN ('CLUB', 'FOUNDATION', 'HOSPITAL', 'UNIVERSITY', 'GOVERNMENT')),
    registration_no VARCHAR(100) UNIQUE NOT NULL,
    logo_url TEXT,
    division_id VARCHAR(32) REFERENCES divisions(id),
    district_id VARCHAR(32) REFERENCES districts(id),
    address TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    member_count INT DEFAULT 0,
    total_donations_organized INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. CAMPAIGNS
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    bn_title VARCHAR(255),
    description TEXT NOT NULL,
    venue VARCHAR(255) NOT NULL,
    division_id VARCHAR(32) REFERENCES divisions(id),
    district_id VARCHAR(32) REFERENCES districts(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    target_units INT NOT NULL DEFAULT 50,
    collected_units INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'UPCOMING' CHECK (status IN ('UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. CERTIFICATES
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    certificate_number VARCHAR(64) UNIQUE NOT NULL,
    donor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    units_donated INT DEFAULT 1,
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    issued_by VARCHAR(255) DEFAULT 'Directorate General of Health Services (DGHS) & Blood Connection',
    verification_token VARCHAR(128) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- AUTOMATED 3-MONTH AVAILABILITY TRIGGER
-- =========================================================================
CREATE OR REPLACE FUNCTION process_donation_and_update_availability()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE donor_profiles
    SET 
        last_donation_date = NEW.donation_date,
        verified_donations_count = verified_donations_count + 1,
        total_units_donated = total_units_donated + NEW.units,
        availability_status = 'UNAVAILABLE_TEMPORARY',
        next_eligible_date = (NEW.donation_date + INTERVAL '3 months')::DATE,
        updated_at = NOW()
    WHERE id = NEW.donor_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_donation_availability ON donations;
CREATE TRIGGER trigger_donation_availability
AFTER INSERT ON donations
FOR EACH ROW
EXECUTE FUNCTION process_donation_and_update_availability();

-- =========================================================================
-- SEED BANGLADESH DIVISIONS
-- =========================================================================
INSERT INTO divisions (id, name, bn_name) VALUES
('dhaka', 'Dhaka', 'ঢাকা'),
('chattogram', 'Chattogram', 'চট্টগ্রাম'),
('rajshahi', 'Rajshahi', 'রাজশাহী'),
('khulna', 'Khulna', 'খুলনা'),
('barishal', 'Barishal', 'বরিশাল'),
('sylhet', 'Sylhet', 'সিলেট'),
('rangpur', 'Rangpur', 'রংপুর'),
('mymensingh', 'Mymensingh', 'ময়মনসিংহ')
ON CONFLICT (id) DO NOTHING;

-- SEED KEY DISTRICTS
INSERT INTO districts (id, division_id, name, bn_name, lat, lng) VALUES
('dhaka', 'dhaka', 'Dhaka', 'ঢাকা', 23.8103, 90.4125),
('gazipur', 'dhaka', 'Gazipur', 'গাজীপুর', 23.9999, 90.4203),
('narayanganj', 'dhaka', 'Narayanganj', 'নারায়ণগঞ্জ', 23.6238, 90.5000),
('chattogram', 'chattogram', 'Chattogram', 'চট্টগ্রাম', 22.3569, 91.7832),
('coxs-bazar', 'chattogram', 'Cox''s Bazar', 'কক্সবাজার', 21.4272, 92.0058),
('sylhet', 'sylhet', 'Sylhet', 'সিলেট', 24.8949, 91.8687),
('rajshahi', 'rajshahi', 'Rajshahi', 'রাজশাহী', 24.3745, 88.6042),
('khulna', 'khulna', 'Khulna', 'খুলনা', 22.8456, 89.5403),
('barishal', 'barishal', 'Barishal', 'বরিশাল', 22.7010, 90.3535),
('rangpur', 'rangpur', 'Rangpur', 'রংপুর', 25.7439, 89.2752),
('mymensingh', 'mymensingh', 'Mymensingh', 'ময়মনসিংহ', 24.7471, 90.4203)
ON CONFLICT (id) DO NOTHING;

-- SEED ORGANIZATIONS
INSERT INTO organizations (name, bn_name, type, registration_no, address, contact_email, contact_phone, member_count, total_donations_organized) VALUES
('Bangladesh Red Crescent Society (BDRCS)', 'বাংলাদেশ রেড ক্রিসেন্ট সোসাইটি', 'GOVERNMENT', 'BDRCS-NAT-1971-001', '684-686 Bara Moghbazar, Dhaka 1217', 'bloodbank@bdrcs.org', '+88029330188', 4200, 84500),
('Sandhani National Blood Club (DMC)', 'সন্ধানী জাতীয় রক্তদান সংস্থা', 'CLUB', 'SND-DMC-1977-012', 'Dhaka Medical College Campus, Dhaka', 'info@sandhanidmc.org', '+8801711234567', 1850, 62000),
('Badhan Voluntary Blood Donors', 'বাঁধন রক্তদাতাদের সংগঠন', 'UNIVERSITY', 'BDN-DU-1997-048', 'TSC, University of Dhaka, Dhaka 1000', 'central@badhan.org', '+8801711998877', 3100, 75200)
ON CONFLICT (registration_no) DO NOTHING;
