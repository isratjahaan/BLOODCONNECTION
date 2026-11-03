import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { bloodConnectionStore } from '../services/store';
import {
  BANGLADESH_DIVISIONS,
  getDistrictsByDivision,
  getUpazilasByDistrict,
} from '../data/bangladeshLocations';
import { BloodGroup } from '../types';
import {
  Search,
  Filter,
  Droplet,
  MapPin,
  CheckCircle,
  Clock,
  Star,
  ShieldCheck,
  PhoneCall,
  Calendar,
  X,
  Send,
  MessageSquare,
} from 'lucide-react';

export const DonorSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [division, setDivision] = useState<string>(searchParams.get('division') || '');
  const [district, setDistrict] = useState<string>(searchParams.get('district') || '');
  const [upazila, setUpazila] = useState<string>(searchParams.get('upazila') || '');
  const [bloodGroup, setBloodGroup] = useState<string>(searchParams.get('bloodGroup') || '');
  const [availabilityOnly, setAvailabilityOnly] = useState<boolean>(
    searchParams.get('availability') === 'AVAILABLE'
  );
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);

  // Contact Modal State
  const [selectedDonorForContact, setSelectedDonorForContact] = useState<any | null>(null);
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  const districts = division ? getDistrictsByDivision(division) : [];
  const upazilas = district ? getUpazilasByDistrict(district) : [];

  const allDonors = bloodConnectionStore.getDonors();

  const filteredDonors = useMemo(() => {
    return allDonors.filter((d) => {
      if (bloodGroup && d.bloodGroup !== bloodGroup) return false;
      if (division && d.profile.divisionId !== division) return false;
      if (district && d.profile.districtId !== district) return false;
      if (upazila && d.profile.upazilaId !== upazila) return false;
      if (availabilityOnly && d.availabilityStatus !== 'AVAILABLE') return false;
      if (verifiedOnly && !d.profile.isVerified) return false;
      return true;
    });
  }, [allDonors, bloodGroup, division, district, upazila, availabilityOnly, verifiedOnly]);

  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSendContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setSelectedDonorForContact(null);
      setContactMessage('');
    }, 2500);
  };

  return (
    <div className="bg-ivory min-h-screen py-8 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="font-serif font-black text-3xl sm:text-4xl text-burgundy">
            Advanced Blood Donor Search
          </h1>
          <p className="text-sm text-charcoal/80 mt-1">
            Search voluntary donors across all 8 divisions and 64 districts with verified 3-month cooldown status.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl border-2 border-gold/40 p-5 shadow-sm mb-8">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gold/20 text-burgundy font-bold text-sm">
            <Filter className="w-4 h-4 text-crimson" />
            <span>Search Filters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Blood Group */}
            <div>
              <label className="block text-xs font-bold text-charcoal/80 uppercase mb-1">
                Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-sm text-charcoal focus:ring-2 focus:ring-gold focus:outline-none"
              >
                <option value="">All Blood Groups</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            {/* Division */}
            <div>
              <label className="block text-xs font-bold text-charcoal/80 uppercase mb-1">
                Division
              </label>
              <select
                value={division}
                onChange={(e) => {
                  setDivision(e.target.value);
                  setDistrict('');
                  setUpazila('');
                }}
                className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-sm text-charcoal focus:ring-2 focus:ring-gold focus:outline-none"
              >
                <option value="">All Divisions</option>
                {BANGLADESH_DIVISIONS.map((div) => (
                  <option key={div.id} value={div.id}>
                    {div.name} ({div.bnName})
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-xs font-bold text-charcoal/80 uppercase mb-1">
                District
              </label>
              <select
                value={district}
                disabled={!division}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setUpazila('');
                }}
                className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-sm text-charcoal focus:ring-2 focus:ring-gold focus:outline-none disabled:opacity-50"
              >
                <option value="">{division ? 'All Districts' : 'Select Division first'}</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.bnName})
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div>
              <label className="block text-xs font-bold text-charcoal/80 uppercase mb-1">
                Thana / Upazila
              </label>
              <select
                value={upazila}
                disabled={!district}
                onChange={(e) => setUpazila(e.target.value)}
                className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-sm text-charcoal focus:ring-2 focus:ring-gold focus:outline-none disabled:opacity-50"
              >
                <option value="">{district ? 'All Thanas' : 'Select District first'}</option>
                {upazilas.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.bnName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Checkbox Options */}
          <div className="mt-4 pt-3 border-t border-gold/20 flex flex-wrap items-center gap-6 text-xs font-semibold">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={availabilityOnly}
                onChange={(e) => setAvailabilityOnly(e.target.checked)}
                className="w-4 h-4 text-crimson rounded border-gold/40 focus:ring-gold"
              />
              <span>Available Donors Only (3-Month Eligible)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 text-crimson rounded border-gold/40 focus:ring-gold"
              />
              <span>Verified Donors Only</span>
            </label>

            <button
              onClick={() => {
                setDivision('');
                setDistrict('');
                setUpazila('');
                setBloodGroup('');
                setAvailabilityOnly(false);
                setVerifiedOnly(false);
              }}
              className="text-crimson hover:underline ml-auto"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-charcoal/70">
            Showing <span className="text-burgundy font-black">{filteredDonors.length}</span> verified donors
          </p>
        </div>

        {/* Donors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map((donor) => {
            const isAvailable = donor.availabilityStatus === 'AVAILABLE';

            return (
              <div
                key={donor.id}
                className="rounded-2xl bg-white border border-gold/50 p-5 shadow-sm hover:shadow-card-gold transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Availability Badge & Verified Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        isAvailable
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                          : 'bg-amber-50 text-amber-800 border border-amber-300'
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      <span>{isAvailable ? 'Available Now' : 'In 3-Mo Cooldown'}</span>
                    </div>

                    {donor.profile.isVerified && (
                      <div className="flex items-center gap-1 text-[10px] font-bold text-gold-dark">
                        <ShieldCheck className="w-3.5 h-3.5 text-gold-metallic" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>

                  {/* Donor Avatar, Name, Blood Group */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <img
                      src={donor.profile.avatarUrl}
                      alt={donor.profile.fullName}
                      className="w-14 h-14 rounded-xl object-cover border-2 border-gold shadow-sm flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-bold text-base text-burgundy truncate">
                        {donor.profile.fullName}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-charcoal/70 mt-0.5">
                        <MapPin className="w-3 h-3 text-crimson flex-shrink-0" />
                        <span className="truncate capitalize">
                          {donor.profile.upazilaId ? `${donor.profile.upazilaId}, ` : ''}
                          {donor.profile.districtId}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-charcoal">
                          {donor.averageRating} ({donor.reviewsCount} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-crimson text-white font-black text-xl flex items-center justify-center border-2 border-gold shadow flex-shrink-0">
                      {donor.bloodGroup}
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-2 bg-ivory-light p-2.5 rounded-xl border border-gold/20 text-center text-xs mb-4">
                    <div>
                      <span className="text-charcoal/60 text-[10px] block">Verified Donations</span>
                      <span className="font-bold text-burgundy font-serif text-sm">
                        {donor.verifiedDonationsCount} times
                      </span>
                    </div>
                    <div>
                      <span className="text-charcoal/60 text-[10px] block">Next Eligible</span>
                      <span className="font-bold text-charcoal text-xs">
                        {donor.nextEligibleDate ? donor.nextEligibleDate : 'Immediately'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-gold/20 flex items-center justify-between gap-2">
                  <Link
                    to={`/donors/${donor.id}`}
                    className="flex-1 text-center py-2 rounded-lg bg-burgundy hover:bg-crimson text-white font-bold text-xs transition-colors"
                  >
                    View Profile
                  </Link>

                  <button
                    onClick={() => setSelectedDonorForContact(donor)}
                    className="flex-1 text-center py-2 rounded-lg bg-gold hover:bg-gold-light text-burgundy-dark font-extrabold text-xs transition-colors shadow-sm"
                  >
                    Contact Donor
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredDonors.length === 0 && (
          <div className="bg-white rounded-2xl border border-gold/40 p-12 text-center my-8">
            <Droplet className="w-12 h-12 text-gold mx-auto mb-3" />
            <h3 className="font-serif font-bold text-xl text-burgundy">
              No donors matching this criteria
            </h3>
            <p className="text-sm text-charcoal/70 mt-1 max-w-md mx-auto">
              Try broadening your search by selecting a larger district or clearing the availability filter.
            </p>
          </div>
        )}
      </div>

      {/* Contact Donor Modal */}
      {selectedDonorForContact && (
        <div className="fixed inset-0 z-50 bg-charcoal/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border-2 border-gold max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedDonorForContact(null)}
              className="absolute top-4 right-4 text-charcoal/60 hover:text-crimson"
            >
              <X className="w-5 h-5" />
            </button>

            {contactSuccess ? (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h3 className="font-serif font-bold text-xl text-burgundy">
                  Contact Request Dispatched!
                </h3>
                <p className="text-xs text-charcoal/80 mt-2">
                  Our system coordinator has relayed your urgent request to{' '}
                  <span className="font-bold">{selectedDonorForContact.profile.fullName}</span>. They will respond shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={selectedDonorForContact.profile.avatarUrl}
                    alt=""
                    className="w-12 h-12 rounded-xl object-cover border border-gold"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-lg text-burgundy">
                      Request Blood: {selectedDonorForContact.profile.fullName}
                    </h3>
                    <p className="text-xs text-charcoal/70">
                      Blood Group: <span className="font-bold text-crimson">{selectedDonorForContact.bloodGroup}</span>
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSendContact} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Patient / Hospital Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dhaka Medical College Hospital, Ward 4"
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Your Contact Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+8801..."
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Message / Urgency Note
                    </label>
                    <textarea
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      required
                      placeholder="Explain how many units are needed and expected transfusion time..."
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-gold-metallic-gradient text-burgundy-dark font-extrabold text-xs flex items-center justify-center gap-2 shadow hover:scale-[1.02] transition-transform"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Emergency Notification</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
