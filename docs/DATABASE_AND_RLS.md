# Supabase Database Architecture & Row-Level Security (RLS) Guide
### BLOOD CONNECTION: Bangladesh National Healthcare Platform

## 1. Schema Architecture
The database is built on Supabase PostgreSQL with 33 relational tables:
- `divisions`: 8 administrative divisions of Bangladesh.
- `districts`: 64 verified districts with lat/lng coordinates and English/Bangla titles.
- `upazilas`: Thanas and Upazilas with district relational keys.
- `profiles`: Master user identity table storing authenticated roles.
- `donor_profiles`: Clinical and donation state (blood group, rh factor, availability, rating, last donation).
- `id_cards`: Digital credential registry with unique ID numbers (`BC-DON-YYYY-XXXXX`) and cryptographic verification tokens.
- `id_verification_logs`: Audit trail of public QR scans and validity checks.
- `blood_requests`: Transfusion requests with hospital details, urgency, and fulfillment state.
- `donations`: Verified clinical blood donation records.
- `donor_reviews`: Feedback and 1-5 star ratings from verified recipients.
- `certificates`: Official DGHS-aligned appreciation certificates.
- `audit_logs`: Immutable security audit logs for all administrative actions.

## 2. Row-Level Security (RLS) Policies
Each table enforces PostgreSQL RLS:
- **SUPER_ADMIN:** Unrestricted administrative oversight across all records.
- **DIVISION_ADMIN:** Restricts SELECT and UPDATE queries strictly to profiles and requests matching `division_id = get_auth_division()`.
- **DISTRICT_COORDINATOR:** Restricts operational control to `district_id = get_auth_district()`.
- **UPAZILA_COORDINATOR:** Restricts localized actions to `upazila_id = get_auth_upazila()`.
- **DONOR:** Full read/write access to own profile; read access to public approved blood requests.
- **VISITOR:** Read-only access to donor directory with phone numbers shielded; insert access for emergency blood requests.

## 3. Automated Triggers
- `trigger_donation_availability`: Automatically fired when a row is inserted into `donations`. Sets donor status to `UNAVAILABLE_TEMPORARY`, updates `last_donation_date`, increments `verified_donations_count`, and calculates `next_eligible_date = donation_date + INTERVAL '3 months'`.
- `trigger_auto_id_card`: Automatically fired when an approved profile is registered, generating the role-specific ID number and verification token.
