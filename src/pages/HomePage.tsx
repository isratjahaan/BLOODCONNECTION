import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { bloodConnectionStore } from '../services/store';
import {
  BANGLADESH_DIVISIONS,
  getDistrictsByDivision,
  getUpazilasByDistrict,
} from '../data/bangladeshLocations';
import {
  Droplet,
  Users,
  Search,
  HeartHandshake,
  Clock,
  Star,
  QrCode,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Building,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Heart,
  PhoneCall,
  Activity,
  Award,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { t, language } = useLanguage();
  const { currentRole } = useAuth();
  const navigate = useNavigate();

  // Search State
  const [selectedDivision, setSelectedDivision] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>('');

  // Active requests from store
  const activeRequests = bloodConnectionStore.getRequests().slice(0, 3);
  const donors = bloodConnectionStore.getDonors();
  const campaigns = bloodConnectionStore.getCampaigns().slice(0, 2);

  // Available districts and upazilas based on cascading selection
  const districts = selectedDivision ? getDistrictsByDivision(selectedDivision) : [];
  const upazilas = selectedDistrict ? getUpazilasByDistrict(selectedDistrict) : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedDivision) params.set('division', selectedDivision);
    if (selectedDistrict) params.set('district', selectedDistrict);
    if (selectedUpazila) params.set('upazila', selectedUpazila);
    if (selectedBloodGroup) params.set('bloodGroup', selectedBloodGroup);
    navigate(`/donors?${params.toString()}`);
  };

  return (
    <div className="bg-ivory min-h-screen text-charcoal">
      {/* ========================================================= */}
      {/* HERO SECTION — EXACT REFERENCE IMAGE #2 MATCH             */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#3D0814] via-[#5C0D20] to-[#7A1028] text-white pt-8 pb-14 md:py-16 border-b-4 border-gold shadow-royal-lg">
        {/* Subtle Heartbeat Pulse Line & Bangladesh Map Contour in Background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden flex items-center justify-center">
          <svg
            className="w-full h-full text-white"
            viewBox="0 0 1200 400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M0,200 L400,200 L430,130 L450,270 L480,90 L510,310 L535,170 L550,200 L1200,200"
              strokeDasharray="8 4"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-4 md:space-y-6">
              <div className="space-y-1">
                <h1 className="font-serif font-black text-4xl sm:text-5xl md:text-6xl tracking-wide text-gold-metallic leading-tight drop-shadow-md">
                  BLOOD CONNECTION
                </h1>
                <p className="font-serif font-semibold text-xl sm:text-2xl md:text-3xl text-ivory tracking-wider">
                  Donate Blood • Save Lives
                </p>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-ivory-light/95 max-w-xl font-normal leading-relaxed">
                A nationwide platform connecting blood donors and recipients across Bangladesh. Real-time availability, instant digital ID verification, and emergency healthcare coverage in all 64 districts.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/register"
                  className="px-6 py-3 rounded-full bg-gold-metallic-gradient text-burgundy-dark font-black text-sm md:text-base tracking-wide flex items-center gap-2 shadow-gold-glow hover:scale-105 transition-all duration-200"
                >
                  <Droplet className="w-5 h-5 fill-crimson text-crimson" />
                  <span>Become a Donor</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  to="/donors"
                  className="px-6 py-3 rounded-full bg-burgundy-dark/90 hover:bg-burgundy text-white border-2 border-gold font-bold text-sm md:text-base flex items-center gap-2 transition-all duration-200 hover:shadow-gold-glow"
                >
                  <Search className="w-4 h-4 text-gold" />
                  <span>Find a Donor</span>
                </Link>
              </div>
            </div>

            {/* Right Hero Visual: Together We Save Lives with Hands Cradling Glowing Blood Drop */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="text-center mb-2">
                <span className="font-serif italic font-bold text-2xl sm:text-3xl text-gold-metallic tracking-wide drop-shadow">
                  Together We Save Lives
                </span>
              </div>

              {/* Glowing Hero Visual Box */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                {/* Golden Glowing Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-gold/30 animate-pulse pointer-events-none" />
                <div className="absolute inset-4 rounded-full border border-gold/40 pointer-events-none" />
                <div className="absolute w-44 h-44 rounded-full bg-crimson/40 blur-2xl pointer-events-none" />

                {/* 3D Blood Drop with Cross and Golden Swirl */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative group">
                    <img
                      src="/assets/images/blood-connection-logo-final.png"
                      alt="BLOOD CONNECTION Official Logo"
                      className="w-64 sm:w-80 md:w-96 h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(212,175,55,0.5)] transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* QUICK ACCESS RIBBON (6 CARDS IMMEDIATELY BELOW HERO)     */}
      {/* ========================================================= */}
      <section className="bg-ivory border-b border-gold/30 py-4 shadow-sm relative -mt-3 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* 1. Register as Donor */}
            <Link
              to="/register"
              className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-gold/40 shadow-sm hover:shadow-card-gold hover:border-gold hover:scale-[1.02] transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-crimson-50 flex items-center justify-center text-crimson group-hover:bg-crimson group-hover:text-white transition-colors flex-shrink-0">
                <Droplet className="w-4 h-4 fill-current" />
              </div>
              <span className="text-xs font-bold text-burgundy leading-tight">
                Register as Donor
              </span>
            </Link>

            {/* 2. Search Blood Donor */}
            <Link
              to="/donors"
              className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-gold/40 shadow-sm hover:shadow-card-gold hover:border-gold hover:scale-[1.02] transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-crimson-50 flex items-center justify-center text-crimson group-hover:bg-crimson group-hover:text-white transition-colors flex-shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-burgundy leading-tight">
                Search Blood Donor (All Bangladesh)
              </span>
            </Link>

            {/* 3. Request Blood (Helpline) */}
            <Link
              to="/blood-request"
              className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-gold/40 shadow-sm hover:shadow-card-gold hover:border-gold hover:scale-[1.02] transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-crimson-50 flex items-center justify-center text-crimson group-hover:bg-crimson group-hover:text-white transition-colors flex-shrink-0">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-burgundy leading-tight">
                Request Blood (Helpline)
              </span>
            </Link>

            {/* 4. Get 3 Months Availability */}
            <Link
              to="/donors?availability=AVAILABLE"
              className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-gold/40 shadow-sm hover:shadow-card-gold hover:border-gold hover:scale-[1.02] transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-crimson-50 flex items-center justify-center text-crimson group-hover:bg-crimson group-hover:text-white transition-colors flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-burgundy leading-tight">
                Get 3 Months Availability
              </span>
            </Link>

            {/* 5. Rate & Review Donors */}
            <Link
              to="/donors"
              className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-gold/40 shadow-sm hover:shadow-card-gold hover:border-gold hover:scale-[1.02] transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-crimson-50 flex items-center justify-center text-crimson group-hover:bg-crimson group-hover:text-white transition-colors flex-shrink-0">
                <Star className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-burgundy leading-tight">
                Rate & Review Donors
              </span>
            </Link>

            {/* 6. Get Digital ID Card */}
            <Link
              to="/dashboard"
              className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-gold/40 shadow-sm hover:shadow-card-gold hover:border-gold hover:scale-[1.02] transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-crimson-50 flex items-center justify-center text-crimson group-hover:bg-crimson group-hover:text-white transition-colors flex-shrink-0">
                <QrCode className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-burgundy leading-tight">
                Get Digital ID Card
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3 CORE CARDS ROW: SEARCH | LIVE STATS | NEED BLOOD        */}
      {/* EXACT REFERENCE IMAGE #2 REPLICATION                      */}
      {/* ========================================================= */}
      <section className="py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* CARD 1: Find Blood Donor (Deep Burgundy Gradient) */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-[#4A0D1C] to-[#2B0710] border-2 border-gold/60 text-white p-5 md:p-6 shadow-royal flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-black text-xl md:text-2xl text-gold-metallic">
                  Find Blood Donor
                </h3>
                <p className="text-xs text-ivory-light/90 mt-1 mb-4">
                  Search donors by Division, District or Thana
                </p>

                {/* Search Form with Dependent Dropdowns */}
                <form onSubmit={handleSearchSubmit} className="space-y-3">
                  {/* Select Division */}
                  <div>
                    <label className="block text-[11px] font-bold text-gold-champagne uppercase mb-1">
                      Division
                    </label>
                    <select
                      value={selectedDivision}
                      onChange={(e) => {
                        setSelectedDivision(e.target.value);
                        setSelectedDistrict('');
                        setSelectedUpazila('');
                      }}
                      className="w-full bg-burgundy-dark/90 border border-gold/40 rounded-lg px-3 py-2 text-sm text-ivory focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                      <option value="">Select Division</option>
                      {BANGLADESH_DIVISIONS.map((div) => (
                        <option key={div.id} value={div.id}>
                          {div.name} ({div.bnName})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Select District (Dependent) */}
                  <div>
                    <label className="block text-[11px] font-bold text-gold-champagne uppercase mb-1">
                      District
                    </label>
                    <select
                      value={selectedDistrict}
                      disabled={!selectedDivision}
                      onChange={(e) => {
                        setSelectedDistrict(e.target.value);
                        setSelectedUpazila('');
                      }}
                      className="w-full bg-burgundy-dark/90 border border-gold/40 rounded-lg px-3 py-2 text-sm text-ivory focus:outline-none focus:ring-2 focus:ring-gold disabled:opacity-50"
                    >
                      <option value="">
                        {selectedDivision ? 'Select District' : 'First select division'}
                      </option>
                      {districts.map((dist) => (
                        <option key={dist.id} value={dist.id}>
                          {dist.name} ({dist.bnName})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Select Thana / Upazila (Dependent) */}
                  <div>
                    <label className="block text-[11px] font-bold text-gold-champagne uppercase mb-1">
                      Thana / Upazila
                    </label>
                    <select
                      value={selectedUpazila}
                      disabled={!selectedDistrict}
                      onChange={(e) => setSelectedUpazila(e.target.value)}
                      className="w-full bg-burgundy-dark/90 border border-gold/40 rounded-lg px-3 py-2 text-sm text-ivory focus:outline-none focus:ring-2 focus:ring-gold disabled:opacity-50"
                    >
                      <option value="">
                        {selectedDistrict ? 'Select Thana' : 'First select district'}
                      </option>
                      {upazilas.map((upz) => (
                        <option key={upz.id} value={upz.id}>
                          {upz.name} ({upz.bnName})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Search Button */}
                  <button
                    type="submit"
                    className="w-full mt-2 py-2.5 rounded-lg bg-burgundy-dark hover:bg-crimson border border-gold text-gold hover:text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Donor</span>
                  </button>
                </form>
              </div>
            </div>

            {/* CARD 2: Live Statistics Card (Ivory/Gold) */}
            <div className="lg:col-span-3 rounded-2xl bg-white border-2 border-gold/40 p-5 md:p-6 shadow-sm flex flex-col justify-between text-center">
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-crimson animate-pulse" />
                  <span className="text-xs font-extrabold text-crimson uppercase tracking-wider">
                    Live Verified Metrics
                  </span>
                </div>

                {/* Metric 1: Registered Donors */}
                <div className="py-3 border-b border-gold/20">
                  <div className="flex items-center justify-center text-crimson mb-1">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="font-serif font-black text-2xl sm:text-3xl text-burgundy">
                    1,25,000+
                  </div>
                  <div className="text-xs font-semibold text-charcoal/80">
                    Registered Donors
                  </div>
                </div>

                {/* Metric 2: Units Donated */}
                <div className="py-3">
                  <div className="flex items-center justify-center text-crimson mb-1">
                    <Droplet className="w-6 h-6 fill-crimson" />
                  </div>
                  <div className="font-serif font-black text-2xl sm:text-3xl text-burgundy">
                    2,50,000+
                  </div>
                  <div className="text-xs font-semibold text-charcoal/80">
                    Units Donated
                  </div>
                </div>
              </div>

              {/* Heart Positive Impact Badge */}
              <div className="mt-2 pt-2 border-t border-gold/20 flex items-center justify-center gap-1.5">
                <Heart className="w-4 h-4 fill-crimson text-crimson" />
                <span className="text-xs font-bold text-burgundy">99% Positive Impact</span>
              </div>
            </div>

            {/* CARD 3: Need Blood? Request Now (Crimson with IV Bag Illustration) */}
            <div className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-[#730D22] via-[#8B1028] to-[#4A0D1C] border-2 border-gold/60 text-white p-5 md:p-6 shadow-royal flex flex-col justify-between relative overflow-hidden">
              {/* IV Bag graphic in background */}
              <div className="absolute right-2 top-4 bottom-4 w-28 opacity-25 pointer-events-none flex items-center justify-center">
                <div className="w-20 h-28 border-2 border-white rounded-b-2xl rounded-t-lg relative flex items-center justify-center">
                  <Heart className="w-8 h-8 fill-white text-white" />
                  <div className="absolute -bottom-4 w-1.5 h-6 bg-white" />
                </div>
              </div>

              <div className="relative z-10 space-y-2">
                <h3 className="font-serif font-black text-2xl sm:text-3xl text-gold-metallic">
                  Need Blood?
                </h3>
                <h4 className="font-serif font-bold text-xl text-white">
                  Request Now
                </h4>
                <p className="text-xs text-ivory-light/95 leading-relaxed pt-1">
                  Post a blood request and let our nationwide coordinator and donor community help you immediately.
                </p>
              </div>

              <div className="relative z-10 pt-4">
                <Link
                  to="/blood-request"
                  className="w-full py-2.5 px-4 rounded-full bg-gold-metallic-gradient text-burgundy-dark font-extrabold text-sm flex items-center justify-center gap-2 shadow-gold-glow hover:scale-105 transition-all"
                >
                  <span>Request Blood</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ROW 2: OUR FEATURES | HERO BANNER | TRUSTED BY            */}
      {/* EXACT REFERENCE IMAGE #2 REPLICATION                      */}
      {/* ========================================================= */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* "Our Features" Card (Gold Checkmarks) */}
            <div className="lg:col-span-5 rounded-2xl bg-white border-2 border-gold/50 p-5 md:p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gold/30">
                <div className="w-3 h-3 rotate-45 bg-crimson" />
                <h3 className="font-serif font-bold text-xl text-burgundy">
                  Our Features
                </h3>
                <div className="w-3 h-3 rotate-45 bg-gold" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-charcoal">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 fill-gold/20" />
                  <span>Nationwide Donor Network</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 fill-gold/20" />
                  <span>Role-Based Access Control</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 fill-gold/20" />
                  <span>Real-time Availability (3 Months)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 fill-gold/20" />
                  <span>All Bangladesh Coverage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 fill-gold/20" />
                  <span>Digital ID Card with QR</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 fill-gold/20" />
                  <span>Secure & Reliable Platform</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 fill-gold/20" />
                  <span>Rating & Feedback System</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 fill-gold/20" />
                  <span>Social Media Sharing</span>
                </div>
              </div>
            </div>

            {/* Campaign Banner: "Be a Donor... Be a Hero... [Join Now ->]" with Monument Silhouette */}
            <div className="lg:col-span-4 rounded-2xl bg-gradient-to-r from-[#590C1D] via-[#85132B] to-[#B31D38] border-2 border-gold/50 text-white p-5 md:p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
              {/* National Martyrs' Memorial Silhouette */}
              <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 pointer-events-none flex items-end justify-end">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                  <polygon points="50,5 65,95 35,95" />
                  <polygon points="50,15 75,95 25,95" opacity="0.7" />
                  <polygon points="50,25 85,95 15,95" opacity="0.4" />
                </svg>
              </div>

              <div className="relative z-10">
                <p className="font-serif italic font-bold text-2xl text-gold-metallic">
                  Be a Donor...
                </p>
                <p className="font-serif italic font-black text-3xl text-white">
                  Be a Hero...
                </p>
              </div>

              <div className="relative z-10 pt-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold-metallic-gradient text-burgundy-dark font-extrabold text-xs shadow hover:scale-105 transition-all"
                >
                  <span>Join Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* "Trusted By" Section: Bangladesh Govt, DGHS, Red Crescent */}
            <div className="lg:col-span-3 rounded-2xl bg-white border-2 border-gold/40 p-4 shadow-sm flex flex-col justify-between">
              <div className="text-center font-serif font-bold text-sm text-burgundy mb-2 pb-1 border-b border-gold/20">
                Trusted By
              </div>

              <div className="flex items-center justify-around gap-3 py-2">
                {/* Bangladesh Govt Seal Mock */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full border-2 border-emerald-600 bg-emerald-50 flex items-center justify-center p-1 text-[9px] font-black text-emerald-800">
                    BD GOV
                  </div>
                  <span className="text-[9px] font-bold text-charcoal/80 mt-1">Govt. of BD</span>
                </div>

                {/* DGHS */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full border-2 border-blue-600 bg-blue-50 flex items-center justify-center p-1 text-[9px] font-black text-blue-800">
                    DGHS
                  </div>
                  <span className="text-[9px] font-bold text-charcoal/80 mt-1">Health Services</span>
                </div>

                {/* Red Crescent */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full border-2 border-crimson bg-crimson-50 flex items-center justify-center p-1 text-crimson font-black text-sm">
                    C
                  </div>
                  <span className="text-[9px] font-bold text-charcoal/80 mt-1">Red Crescent</span>
                </div>
              </div>

              <div className="text-[10px] text-center text-charcoal/60 mt-1">
                Official National Standards
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ACTIVE EMERGENCY BLOOD REQUESTS CAROUSEL                   */}
      {/* ========================================================= */}
      <section className="py-8 bg-ivory-light border-y border-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-crimson animate-ping" />
              <h2 className="font-serif font-black text-2xl text-burgundy">
                Urgent Blood Requests Across Bangladesh
              </h2>
            </div>
            <Link
              to="/requests"
              className="text-xs font-bold text-crimson hover:text-burgundy flex items-center gap-1"
            >
              <span>View All Requests</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {activeRequests.map((req) => (
              <div
                key={req.id}
                className="rounded-2xl bg-white border border-gold/50 p-5 shadow-sm hover:shadow-card-gold transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-crimson text-white">
                      {req.urgency}
                    </span>
                    <span className="text-xs font-bold text-charcoal/70">
                      Needed: {req.requiredDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-crimson text-white font-black text-xl flex items-center justify-center border-2 border-gold shadow">
                      {req.bloodGroup}
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-burgundy">
                        {req.patientName}
                      </h4>
                      <p className="text-xs text-charcoal/70">
                        {req.requiredUnits} unit(s) needed
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-charcoal/80 space-y-1 mb-4">
                    <p className="font-semibold text-burgundy truncate">
                      🏥 {req.hospitalName}
                    </p>
                    <p className="truncate text-charcoal/60">
                      📍 {req.hospitalAddress}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gold/20 flex items-center justify-between">
                  <a
                    href={`tel:${req.contactPhone}`}
                    className="flex items-center gap-1.5 text-xs font-bold text-crimson hover:underline"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Helpline</span>
                  </a>
                  <Link
                    to={`/requests/${req.id}`}
                    className="px-3 py-1.5 rounded-lg bg-burgundy hover:bg-crimson text-gold text-xs font-bold transition-colors"
                  >
                    Respond
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8-DIVISION COVERAGE NETWORK SECTION                       */}
      {/* ========================================================= */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="font-serif font-black text-3xl text-burgundy">
            Nationwide Coverage: 8 Divisions & 64 Districts
          </h2>
          <p className="text-sm text-charcoal/80 mt-2">
            Every divisional capital and district in Bangladesh is staffed with an authorized blood coordinator and real-time donor network.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {BANGLADESH_DIVISIONS.map((div) => (
            <Link
              key={div.id}
              to={`/donors?division=${div.id}`}
              className="p-4 rounded-xl bg-white border border-gold/40 shadow-sm hover:border-crimson hover:shadow-card-gold transition-all group text-center"
            >
              <h4 className="font-serif font-bold text-lg text-burgundy group-hover:text-crimson">
                {div.name}
              </h4>
              <p className="text-xs text-gold-dark font-medium">{div.bnName}</p>
              <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-crimson-50 text-[10px] font-bold text-crimson">
                {div.districts.length} Districts Covered
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
