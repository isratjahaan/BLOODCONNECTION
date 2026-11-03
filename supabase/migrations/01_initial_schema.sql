-- ===================================================
-- BLOOD CONNECTION: BANGLADESH NATIONAL BLOOD DONATION ECOSYSTEM
-- MIGRATION 01: CORE DATABASE SCHEMA
-- ===================================================

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

-- 4. UNIONS
CREATE TABLE IF NOT EXISTS unions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    upazila_id VARCHAR(64) REFERENCES upazilas(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    bn_name VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. WARDS
CREATE TABLE IF NOT EXISTS wards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    union_id UUID REFERENCES unions(id) ON DELETE CASCADE,
    ward_number VARCHAR(10) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. USER PROFILES
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
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
    is_verified BOOLEAN DEFAULT FALSE,
    is_suspended BOOLEAN DEFAULT FALSE,
    deletion_requested BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ROLE PERMISSIONS
CREATE TABLE IF NOT EXISTS role_permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role VARCHAR(32) NOT NULL,
    permission VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(role, permission)
);

-- 8. ORGANIZATIONS
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    bn_name VARCHAR(255),
    type VARCHAR(50) NOT NULL CHECK (type IN ('CLUB', 'FOUNDATION', 'HOSPITAL', 'UNIVERSITY', 'GOVERNMENT')),
    registration_no VARCHAR(100) UNIQUE NOT NULL,
    logo_url TEXT,
    division_id VARCHAR(32) REFERENCES divisions(id),
    district_id VARCHAR(32) REFERENCES districts(id),
    upazila_id VARCHAR(64) REFERENCES upazilas(id),
    address TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    website VARCHAR(255),
    admin_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ORGANIZATION MEMBERS
CREATE TABLE IF NOT EXISTS organization_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    designation VARCHAR(100) DEFAULT 'Member',
    is_approved BOOLEAN DEFAULT TRUE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, user_id)
);

-- 10. DONOR PROFILES
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
    preferred_contact_method VARCHAR(20) DEFAULT 'phone' CHECK (preferred_contact_method IN ('phone', 'whatsapp', 'email', 'in_app')),
    is_available_for_emergency BOOLEAN DEFAULT TRUE,
    medical_warning_acknowledged BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. DONOR AVAILABILITY HISTORY
CREATE TABLE IF NOT EXISTS donor_availability_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_id UUID REFERENCES donor_profiles(id) ON DELETE CASCADE,
    previous_status VARCHAR(32) NOT NULL,
    new_status VARCHAR(32) NOT NULL,
    reason TEXT,
    changed_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. DIGITAL ID CARDS
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

-- 13. ID VERIFICATION LOGS
CREATE TABLE IF NOT EXISTS id_verification_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_card_id UUID REFERENCES id_cards(id) ON DELETE CASCADE,
    verification_token VARCHAR(128) NOT NULL,
    scanner_ip VARCHAR(45),
    scanner_user_agent TEXT,
    is_valid BOOLEAN NOT NULL,
    scanned_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. BLOOD REQUESTS
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
    status VARCHAR(32) NOT NULL DEFAULT 'PENDING' CHECK (
        status IN ('PENDING', 'UNDER_REVIEW', 'APPROVED', 'MATCHING', 'PARTIALLY_FULFILLED', 'FULFILLED', 'REJECTED', 'CANCELLED', 'EXPIRED')
    ),
    verified_by_coordinator_id UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. BLOOD REQUEST RESPONSES
CREATE TABLE IF NOT EXISTS blood_request_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID REFERENCES blood_requests(id) ON DELETE CASCADE,
    donor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'ACCEPTED' CHECK (status IN ('ACCEPTED', 'DECLINED', 'COMPLETED', 'CANCELLED')),
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. DONATIONS RECORD
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

-- 17. DONATION VERIFICATIONS
CREATE TABLE IF NOT EXISTS donation_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donation_id UUID REFERENCES donations(id) ON DELETE CASCADE,
    verified_by UUID REFERENCES profiles(id),
    hospital_contact_name VARCHAR(255),
    hospital_contact_phone VARCHAR(20),
    verification_documents_url TEXT,
    notes TEXT,
    status VARCHAR(20) DEFAULT 'VERIFIED' CHECK (status IN ('PENDING', 'VERIFIED', 'REJECTED')),
    verified_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. DONOR REVIEWS
CREATE TABLE IF NOT EXISTS donor_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_id UUID REFERENCES donor_profiles(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT NOT NULL,
    is_verified_interaction BOOLEAN DEFAULT TRUE,
    is_flagged BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. REVIEW REPORTS
CREATE TABLE IF NOT EXISTS review_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_id UUID REFERENCES donor_reviews(id) ON DELETE CASCADE,
    reporter_id UUID REFERENCES profiles(id),
    reason TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'RESOLVED', 'DISMISSED')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(32) NOT NULL DEFAULT 'SYSTEM',
    is_read BOOLEAN DEFAULT FALSE,
    link_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. NOTIFICATION PREFERENCES
CREATE TABLE IF NOT EXISTS notification_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    email_enabled BOOLEAN DEFAULT TRUE,
    sms_enabled BOOLEAN DEFAULT TRUE,
    in_app_enabled BOOLEAN DEFAULT TRUE,
    emergency_broadcast_enabled BOOLEAN DEFAULT TRUE
);

-- 22. CAMPAIGNS
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    bn_title VARCHAR(255),
    description TEXT NOT NULL,
    venue VARCHAR(255) NOT NULL,
    division_id VARCHAR(32) REFERENCES divisions(id),
    district_id VARCHAR(32) REFERENCES districts(id),
    upazila_id VARCHAR(64) REFERENCES upazilas(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    target_units INT NOT NULL DEFAULT 50,
    collected_units INT DEFAULT 0,
    banner_url TEXT,
    status VARCHAR(20) DEFAULT 'UPCOMING' CHECK (status IN ('UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 23. CAMPAIGN REGISTRATIONS
CREATE TABLE IF NOT EXISTS campaign_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    donor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    registered_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(campaign_id, donor_id)
);

-- 24. CERTIFICATES
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    certificate_number VARCHAR(64) UNIQUE NOT NULL,
    donor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    donation_id UUID REFERENCES donations(id) ON DELETE SET NULL,
    units_donated INT DEFAULT 1,
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    issued_by VARCHAR(255) DEFAULT 'Blood Connection National Authority',
    verification_token VARCHAR(128) UNIQUE NOT NULL,
    pdf_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 25. VOLUNTEER ASSIGNMENTS
CREATE TABLE IF NOT EXISTS volunteer_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    volunteer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    task_title VARCHAR(255) NOT NULL,
    description TEXT,
    request_id UUID REFERENCES blood_requests(id) ON DELETE SET NULL,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'ASSIGNED' CHECK (status IN ('ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 26. SUPPORT TICKETS
CREATE TABLE IF NOT EXISTS support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    subject VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'IN_REVIEW', 'RESOLVED', 'CLOSED')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 27. AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    actor_role VARCHAR(32) NOT NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id VARCHAR(100),
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 28. SYSTEM SETTINGS
CREATE TABLE IF NOT EXISTS system_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 29. ADMIN INVITATIONS
CREATE TABLE IF NOT EXISTS admin_invitations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL,
    assigned_division VARCHAR(32),
    assigned_district VARCHAR(32),
    assigned_upazila VARCHAR(64),
    invitation_token VARCHAR(128) UNIQUE NOT NULL,
    invited_by UUID REFERENCES profiles(id),
    expires_at TIMESTAMPTZ NOT NULL,
    is_accepted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 30. CONTACT REQUESTS
CREATE TABLE IF NOT EXISTS contact_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_name VARCHAR(255) NOT NULL,
    requester_phone VARCHAR(20) NOT NULL,
    donor_id UUID REFERENCES donor_profiles(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'FORWARDED', 'ACCEPTED', 'REJECTED')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 31. USER CONSENTS
CREATE TABLE IF NOT EXISTS user_consents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    consent_type VARCHAR(50) NOT NULL,
    is_agreed BOOLEAN NOT NULL DEFAULT TRUE,
    agreed_at TIMESTAMPTZ DEFAULT NOW()
);
