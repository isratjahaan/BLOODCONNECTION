import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  BANGLADESH_DIVISIONS,
  getDistrictsByDivision,
  getUpazilasByDistrict,
} from '../data/bangladeshLocations';
import { BloodGroup } from '../types';
import { DigitalIdCard } from '../components/id/DigitalIdCard';
import confetti from 'canvas-confetti';
import {
  Droplet,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { registerDonor } = useAuth();

  const [step, setStep] = useState<1 | 2>(1);
  const [createdIdCard, setCreatedIdCard] = useState<any | null>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O+');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [divisionId, setDivisionId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [upazilaId, setUpazilaId] = useState('');
  const [address, setAddress] = useState('');
  const [lastDonationDate, setLastDonationDate] = useState('');
  const [preferredContact, setPreferredContact] = useState<'phone' | 'whatsapp' | 'email' | 'in_app'>('phone');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [consentAgreed, setConsentAgreed] = useState(false);
  const [medicalWarningAgreed, setMedicalWarningAgreed] = useState(false);

  const districts = divisionId ? getDistrictsByDivision(divisionId) : [];
  const upazilas = districtId ? getUpazilasByDistrict(districtId) : [];

  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentAgreed || !medicalWarningAgreed) {
      alert('Please agree to privacy consent and the 3-month medical availability guidelines.');
      return;
    }

    const rhFactor = bloodGroup.endsWith('+') ? '+' : '-';

    const result = registerDonor({
      fullName,
      email,
      phone,
      bloodGroup,
      rhFactor,
      dateOfBirth: dateOfBirth || '2000-01-01',
      gender,
      divisionId: divisionId || 'dhaka',
      districtId: districtId || 'dhaka',
      upazilaId: upazilaId || 'dhanmondi',
      address,
      emergencyContactName,
      emergencyContactPhone,
      preferredContactMethod: preferredContact,
    });

    setCreatedIdCard(result.idCard);
    setStep(2);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#8B1028', '#FFFFFF'],
      });
    } catch (e) {
      // Ignored if canvas-confetti is in non-browser env
    }
  };

  return (
    <div className="bg-ivory min-h-screen py-10 text-charcoal">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {step === 1 ? (
          <div className="bg-white rounded-3xl border-2 border-gold/40 p-6 sm:p-10 shadow-royal">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-crimson-50 border border-gold mx-auto flex items-center justify-center text-crimson mb-3 shadow-sm">
                <Droplet className="w-8 h-8 fill-crimson text-crimson" />
              </div>
              <h1 className="font-serif font-black text-3xl sm:text-4xl text-burgundy">
                Join as a Verified Voluntary Donor
              </h1>
              <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
                Receive your official Digital ID Card with QR Verification & help save lives across Bangladesh.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* SECTION 1: Personal Information */}
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-base text-burgundy border-b border-gold/20 pb-1 flex items-center gap-2">
                  <User className="w-4 h-4 text-crimson" />
                  <span>1. Personal & Contact Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Full Name (English) *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Tanvir Hossain"
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. tanvir@example.com"
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Phone Number (Active for SMS/OTP) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+8801712..."
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Gender *
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Preferred Contact Method
                    </label>
                    <select
                      value={preferredContact}
                      onChange={(e) => setPreferredContact(e.target.value as any)}
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                    >
                      <option value="phone">Phone Call</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="email">Email</option>
                      <option value="in_app">In-App Notification</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Medical & Blood Information */}
              <div className="space-y-4 pt-2">
                <h3 className="font-serif font-bold text-base text-burgundy border-b border-gold/20 pb-1 flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-crimson fill-crimson" />
                  <span>2. Blood & Eligibility Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Blood Group *
                    </label>
                    <select
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                      className="w-full bg-ivory-light border-2 border-gold rounded-lg px-3 py-2 text-sm font-bold text-burgundy focus:ring-2 focus:ring-crimson"
                    >
                      {bloodGroups.map((bg) => (
                        <option key={bg} value={bg}>
                          {bg}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Last Donation Date (Leave empty if first time)
                    </label>
                    <input
                      type="date"
                      value={lastDonationDate}
                      onChange={(e) => setLastDonationDate(e.target.value)}
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: Bangladesh Location Hierarchy */}
              <div className="space-y-4 pt-2">
                <h3 className="font-serif font-bold text-base text-burgundy border-b border-gold/20 pb-1 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-crimson" />
                  <span>3. Geographic Location (Bangladesh)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Division *
                    </label>
                    <select
                      required
                      value={divisionId}
                      onChange={(e) => {
                        setDivisionId(e.target.value);
                        setDistrictId('');
                        setUpazilaId('');
                      }}
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                    >
                      <option value="">Select Division</option>
                      {BANGLADESH_DIVISIONS.map((div) => (
                        <option key={div.id} value={div.id}>
                          {div.name} ({div.bnName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      District *
                    </label>
                    <select
                      required
                      disabled={!divisionId}
                      value={districtId}
                      onChange={(e) => {
                        setDistrictId(e.target.value);
                        setUpazilaId('');
                      }}
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold disabled:opacity-50"
                    >
                      <option value="">
                        {divisionId ? 'Select District' : 'First select division'}
                      </option>
                      {districts.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name} ({d.bnName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Thana / Upazila *
                    </label>
                    <select
                      required
                      disabled={!districtId}
                      value={upazilaId}
                      onChange={(e) => setUpazilaId(e.target.value)}
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold disabled:opacity-50"
                    >
                      <option value="">
                        {districtId ? 'Select Thana' : 'First select district'}
                      </option>
                      {upazilas.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.name} ({u.bnName})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal/80 mb-1">
                    Street Address / Area
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. House 14, Road 5, Sector 4"
                    className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>

              {/* SECTION 4: Terms & Medical Consent */}
              <div className="pt-2 space-y-3 bg-ivory-light p-4 rounded-xl border border-gold/30">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs leading-relaxed text-charcoal/90">
                  <input
                    type="checkbox"
                    checked={consentAgreed}
                    onChange={(e) => setConsentAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-crimson rounded border-gold/40 focus:ring-gold"
                  />
                  <span>
                    I confirm that I am donating blood voluntarily without monetary expectation, and consent to having my verified blood group and general district displayed to verified seekers.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-xs leading-relaxed text-charcoal/90">
                  <input
                    type="checkbox"
                    checked={medicalWarningAgreed}
                    onChange={(e) => setMedicalWarningAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-crimson rounded border-gold/40 focus:ring-gold"
                  />
                  <span>
                    I acknowledge the 3-Month Availability Rule as an automated platform interval, and understand final clinical eligibility is determined at the hospital by qualified healthcare staff.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gold-metallic-gradient text-burgundy-dark font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow hover:scale-[1.02] transition-transform"
              >
                <Sparkles className="w-4 h-4" />
                <span>Complete Registration & Generate Digital ID</span>
              </button>
            </form>
          </div>
        ) : (
          /* STEP 2: REGISTRATION SUCCESS & DIGITAL ID CARD SHOWCASE */
          <div className="bg-white rounded-3xl border-2 border-gold/40 p-6 sm:p-10 shadow-royal text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 mx-auto flex items-center justify-center text-emerald-600 mb-4 shadow">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h2 className="font-serif font-black text-3xl sm:text-4xl text-burgundy">
              Registration Successful!
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/80 max-w-lg mx-auto mt-2 mb-6">
              Welcome to the Bangladesh National Blood Connection. Your official Digital ID Card has been generated with a unique QR code.
            </p>

            {/* Showcase Generated Digital ID Card */}
            {createdIdCard && (
              <div className="my-8">
                <DigitalIdCard idCard={createdIdCard} showSharingControls={true} />
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/dashboard"
                className="px-6 py-2.5 rounded-full bg-burgundy hover:bg-crimson text-gold font-bold text-xs sm:text-sm transition-colors shadow"
              >
                Go to Donor Dashboard
              </Link>
              <Link
                to="/donors"
                className="px-6 py-2.5 rounded-full border border-gold text-burgundy hover:bg-ivory font-bold text-xs sm:text-sm transition-colors"
              >
                Explore Donor Directory
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
