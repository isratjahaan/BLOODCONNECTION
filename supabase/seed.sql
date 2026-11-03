-- ===================================================
-- BLOOD CONNECTION: BANGLADESH NATIONAL SEED DATA
-- ===================================================

-- Divisions
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

-- Selected Seed Districts
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

-- Selected Seed Upazilas
INSERT INTO upazilas (id, district_id, name, bn_name) VALUES
('dhanmondi', 'dhaka', 'Dhanmondi', 'ধানমন্ডি'),
('gulshan', 'dhaka', 'Gulshan', 'গুলশান'),
('mirpur', 'dhaka', 'Mirpur', 'মিরপুর'),
('uttara', 'dhaka', 'Uttara', 'উত্তরা'),
('panchlaish', 'chattogram', 'Panchlaish', 'পাঁচলাইশ'),
('agrabad', 'chattogram', 'Agrabad', 'আগ্রাবাদ'),
('sylhet-sadar', 'sylhet', 'Sylhet Sadar', 'সিলেট সদর'),
('boalia', 'rajshahi', 'Boalia', 'বোয়ালিয়া')
ON CONFLICT (id) DO NOTHING;
