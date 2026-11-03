-- =========================================================================
-- BLOOD CONNECTION: ENABLE PUBLIC READ & REGISTRATION POLICIES (RLS)
-- RUN THIS IN SQL EDITOR SO THE WEB APP CAN READ PUBLIC DATA
-- =========================================================================

-- Enable RLS
ALTER TABLE divisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE upazilas ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE donor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE id_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE donor_reviews ENABLE ROW LEVEL SECURITY;

-- Read policies
DROP POLICY IF EXISTS "Public read divisions" ON divisions;
CREATE POLICY "Public read divisions" ON divisions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read districts" ON districts;
CREATE POLICY "Public read districts" ON districts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read upazilas" ON upazilas;
CREATE POLICY "Public read upazilas" ON upazilas FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read organizations" ON organizations;
CREATE POLICY "Public read organizations" ON organizations FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read campaigns" ON campaigns;
CREATE POLICY "Public read campaigns" ON campaigns FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read blood_requests" ON blood_requests;
CREATE POLICY "Public read blood_requests" ON blood_requests FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read donor_profiles" ON donor_profiles;
CREATE POLICY "Public read donor_profiles" ON donor_profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read profiles" ON profiles;
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read id_cards" ON id_cards;
CREATE POLICY "Public read id_cards" ON id_cards FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read certificates" ON certificates;
CREATE POLICY "Public read certificates" ON certificates FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read donor_reviews" ON donor_reviews;
CREATE POLICY "Public read donor_reviews" ON donor_reviews FOR SELECT USING (true);

-- Insert policies
DROP POLICY IF EXISTS "Public insert requests" ON blood_requests;
CREATE POLICY "Public insert requests" ON blood_requests FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert profiles" ON profiles;
CREATE POLICY "Public insert profiles" ON profiles FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert donor_profiles" ON donor_profiles;
CREATE POLICY "Public insert donor_profiles" ON donor_profiles FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert id_cards" ON id_cards;
CREATE POLICY "Public insert id_cards" ON id_cards FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert reviews" ON donor_reviews;
CREATE POLICY "Public insert reviews" ON donor_reviews FOR INSERT WITH CHECK (true);
