import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { bloodConnectionStore } from '../../services/store';
import { DigitalIdCard } from '../../components/id/DigitalIdCard';
import {
  MapPin,
  Users,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  PlusCircle,
  AlertCircle,
  FileCheck,
} from 'lucide-react';

export const CoordinatorDashboard: React.FC = () => {
  const { currentUser, currentIdCard, refreshState } = useAuth();

  // Verification modal state
  const [selectedDonorForDonation, setSelectedDonorForDonation] = useState<string>('');
  const [hospitalName, setHospitalName] = useState('Dhaka Medical College Hospital');
  const [units, setUnits] = useState(1);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const donors = bloodConnectionStore.getDonors();
  const requests = bloodConnectionStore.getRequests();

  // Filter based on coordinator's geographic jurisdiction (Security Rule from PART 03 & PART 19)
  const isDivisionAdmin = currentUser?.role === 'DIVISION_ADMIN';
  const isDistrictCoord = currentUser?.role === 'DISTRICT_COORDINATOR';
  const isUpazilaCoord = currentUser?.role === 'UPAZILA_COORDINATOR';

  const assignedJurisdiction = currentUser?.assignedJurisdiction || 'Assigned Area';

  const jurisdictionalDonors = donors.filter((d) => {
    if (isDivisionAdmin) return d.profile.divisionId === currentUser?.divisionId;
    if (isDistrictCoord) return d.profile.districtId === currentUser?.districtId;
    if (isUpazilaCoord) return d.profile.upazilaId === currentUser?.upazilaId;
    return true;
  });

  const jurisdictionalRequests = requests.filter((r) => {
    if (isDivisionAdmin) return r.divisionId === currentUser?.divisionId;
    if (isDistrictCoord) return r.districtId === currentUser?.districtId;
    if (isUpazilaCoord) return r.upazilaId === currentUser?.upazilaId;
    return true;
  });

  const handleRecordDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDonorForDonation) return;

    bloodConnectionStore.recordDonationAndUpdateAvailability(
      selectedDonorForDonation,
      hospitalName,
      units,
      currentUser ? currentUser.id : 'coord'
    );

    setVerificationSuccess(true);
    refreshState();
    setTimeout(() => {
      setVerificationSuccess(false);
      setSelectedDonorForDonation('');
    }, 3000);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-burgundy via-crimson to-burgundy text-white p-6 rounded-3xl border-2 border-gold shadow-royal flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-gold text-burgundy-dark font-extrabold text-[10px] uppercase">
              📍 {currentUser?.role.replace('_', ' ')}
            </span>
            <span className="text-xs text-gold-light font-bold">
              ID: {currentIdCard?.idNumber}
            </span>
          </div>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-gold-metallic mt-1">
            {assignedJurisdiction} Operational Console
          </h2>
          <p className="text-xs text-ivory/80">
            Coordinator: {currentUser?.fullName} • Strict Row-Level Security Enforced for your assigned area.
          </p>
        </div>

        <div className="bg-burgundy-dark/90 border border-gold/50 p-3.5 rounded-2xl text-center self-start sm:self-center">
          <span className="text-[10px] uppercase font-bold text-gold-champagne block">
            Jurisdictional Donors
          </span>
          <span className="font-serif font-black text-2xl text-gold-metallic block">
            {jurisdictionalDonors.length}
          </span>
        </div>
      </div>

      {/* Action Box: Record Verified Donation & Trigger 3-Month Cooldown */}
      <div className="bg-white rounded-3xl border-2 border-gold/40 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gold/20">
          <FileCheck className="w-5 h-5 text-crimson" />
          <h3 className="font-serif font-bold text-lg text-burgundy">
            Record Verified Donation (Triggers 3-Month Automated Cooldown)
          </h3>
        </div>
        <p className="text-xs text-charcoal/70 mb-4">
          When a donor donates blood at a hospital within your jurisdiction, verify it here. The system will immediately issue a DGHS appreciation certificate and put the donor on a 3-month cooldown.
        </p>

        {verificationSuccess ? (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>
              Donation verified successfully! The donor's status has been transitioned to UNAVAILABLE_TEMPORARY for 3 months, and an official Certificate of Appreciation was issued.
            </span>
          </div>
        ) : (
          <form onSubmit={handleRecordDonation} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-charcoal/80 mb-1">
                Select Donor in Jurisdiction
              </label>
              <select
                required
                value={selectedDonorForDonation}
                onChange={(e) => setSelectedDonorForDonation(e.target.value)}
                className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
              >
                <option value="">-- Select Donor --</option>
                {jurisdictionalDonors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.profile.fullName} ({d.bloodGroup}) — {d.availabilityStatus}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-charcoal/80 mb-1">
                Hospital / Donation Center
              </label>
              <input
                type="text"
                required
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-burgundy hover:bg-crimson text-gold font-bold text-xs shadow transition-colors flex items-center justify-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Verify & Record Donation</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Two Columns: Jurisdictional Donors & Jurisdictional Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Jurisdictional Donors */}
        <div className="bg-white rounded-3xl border border-gold/40 p-6 shadow-sm">
          <h3 className="font-serif font-bold text-lg text-burgundy mb-4">
            Donors in {assignedJurisdiction} ({jurisdictionalDonors.length})
          </h3>

          <div className="space-y-3">
            {jurisdictionalDonors.map((d) => (
              <div
                key={d.id}
                className="p-3.5 rounded-xl bg-ivory-light border border-gold/30 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={d.profile.avatarUrl}
                    alt=""
                    className="w-10 h-10 rounded-lg object-cover border border-gold"
                  />
                  <div>
                    <h5 className="font-serif font-bold text-xs text-burgundy">
                      {d.profile.fullName}
                    </h5>
                    <span className="text-[10px] text-charcoal/70">
                      {d.bloodGroup} • {d.profile.upazilaId || d.profile.districtId}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      d.availabilityStatus === 'AVAILABLE'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {d.availabilityStatus === 'AVAILABLE' ? 'Eligible' : 'In Cooldown'}
                  </span>
                  <span className="text-[10px] text-charcoal/60 block mt-0.5">
                    {d.verifiedDonationsCount} donations
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jurisdictional Requests */}
        <div className="bg-white rounded-3xl border border-gold/40 p-6 shadow-sm">
          <h3 className="font-serif font-bold text-lg text-burgundy mb-4">
            Blood Requests in {assignedJurisdiction} ({jurisdictionalRequests.length})
          </h3>

          <div className="space-y-3">
            {jurisdictionalRequests.map((r) => (
              <div
                key={r.id}
                className="p-3.5 rounded-xl bg-ivory-light border border-gold/30 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[9.5px] font-extrabold uppercase bg-crimson text-white">
                      {r.urgency}
                    </span>
                    <span className="font-serif font-bold text-xs text-burgundy">
                      {r.patientName} ({r.bloodGroup})
                    </span>
                  </div>
                  <p className="text-[10px] text-charcoal/70 truncate mt-1">
                    🏥 {r.hospitalName} ({r.fulfilledUnits}/{r.requiredUnits} units)
                  </p>
                </div>

                <span className="text-xs font-bold text-burgundy uppercase">
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Official Coordinator Digital ID Card */}
      {currentIdCard && (
        <div className="bg-white rounded-3xl border border-gold/40 p-6 sm:p-8 shadow-sm flex flex-col items-center">
          <h3 className="font-serif font-black text-xl text-burgundy mb-4">
            Coordinator Official Credentials
          </h3>
          <DigitalIdCard idCard={currentIdCard} showSharingControls={true} />
        </div>
      )}
    </div>
  );
};
