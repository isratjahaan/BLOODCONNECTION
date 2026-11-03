import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { bloodConnectionStore } from '../../services/store';
import { DigitalIdCard } from '../../components/id/DigitalIdCard';
import {
  Clock,
  Droplet,
  Award,
  Star,
  ShieldCheck,
  Calendar,
  AlertCircle,
  FileText,
  Download,
  Share2,
  CheckCircle2,
  Heart,
} from 'lucide-react';

export const DonorDashboard: React.FC = () => {
  const { currentUser, currentIdCard, refreshState } = useAuth();

  const donor = currentUser ? bloodConnectionStore.getDonorByUserId(currentUser.id) : undefined;
  const certificates = currentUser
    ? bloodConnectionStore.getCertificatesByUserId(currentUser.id)
    : [];
  const reviews = donor ? bloodConnectionStore.getReviewsByDonorId(donor.id) : [];

  const [activeTab, setActiveTab] = useState<'id' | 'availability' | 'history' | 'certificates'>(
    'id'
  );

  if (!donor) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-gold text-center">
        <h3 className="font-serif font-bold text-xl text-burgundy">No Donor Profile Linked</h3>
        <p className="text-xs text-charcoal/70 mt-2">
          Your current account is authenticated as {currentUser?.role}. Register as a donor to view personal donor statistics.
        </p>
      </div>
    );
  }

  const isAvailable = donor.availabilityStatus === 'AVAILABLE';

  // Toggle manual availability
  const handleToggleAvailability = (newStatus: 'AVAILABLE' | 'UNAVAILABLE_TEMPORARY') => {
    bloodConnectionStore.updateDonorAvailabilityStatus(donor.id, newStatus);
    refreshState();
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-burgundy via-crimson to-burgundy text-white p-6 rounded-3xl border-2 border-gold shadow-royal flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={donor.profile.avatarUrl}
            alt=""
            className="w-16 h-16 rounded-2xl object-cover border-2 border-gold shadow-gold-glow flex-shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-crimson border border-gold text-white font-black text-xs">
                {donor.bloodGroup}
              </span>
              <span className="text-xs text-gold-light font-bold">
                Donor ID: {currentIdCard?.idNumber}
              </span>
            </div>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-gold-metallic mt-1">
              Welcome back, {donor.profile.fullName}!
            </h2>
            <p className="text-xs text-ivory/80">
              {donor.profile.upazilaId ? `${donor.profile.upazilaId}, ` : ''}
              {donor.profile.districtId} • {donor.verifiedDonationsCount} Verified Donations
            </p>
          </div>
        </div>

        {/* 3-Month Availability Badge */}
        <div className="bg-burgundy-dark/90 border border-gold/50 p-3.5 rounded-2xl text-center self-start sm:self-center">
          <span className="text-[10px] uppercase font-bold text-gold-champagne block">
            Current Status
          </span>
          <span
            className={`font-black text-xs sm:text-sm block mt-0.5 ${
              isAvailable ? 'text-emerald-400' : 'text-amber-400'
            }`}
          >
            {isAvailable ? 'AVAILABLE TO DONATE' : '3-MONTH COOLDOWN'}
          </span>
          {donor.nextEligibleDate && (
            <span className="text-[10px] text-ivory/70 block mt-0.5">
              Next Eligible: {donor.nextEligibleDate}
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gold/30 text-xs font-bold gap-6">
        <button
          onClick={() => setActiveTab('id')}
          className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'id'
              ? 'border-crimson text-crimson font-black'
              : 'border-transparent text-charcoal/60 hover:text-charcoal'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Digital ID Card & QR</span>
        </button>

        <button
          onClick={() => setActiveTab('availability')}
          className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'availability'
              ? 'border-crimson text-crimson font-black'
              : 'border-transparent text-charcoal/60 hover:text-charcoal'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>3-Month Availability Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'history'
              ? 'border-crimson text-crimson font-black'
              : 'border-transparent text-charcoal/60 hover:text-charcoal'
          }`}
        >
          <Droplet className="w-4 h-4" />
          <span>Donation History & Reviews ({reviews.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('certificates')}
          className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'certificates'
              ? 'border-crimson text-crimson font-black'
              : 'border-transparent text-charcoal/60 hover:text-charcoal'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Appreciation Certificates ({certificates.length})</span>
        </button>
      </div>

      {/* TAB 1: DIGITAL ID CARD (FRONT & BACK 3D FLIP) */}
      {activeTab === 'id' && (
        <div className="bg-white rounded-3xl border border-gold/40 p-6 sm:p-8 shadow-sm flex flex-col items-center">
          <div className="text-center max-w-md mb-6">
            <h3 className="font-serif font-black text-2xl text-burgundy">
              Your Official Digital ID Card
            </h3>
            <p className="text-xs text-charcoal/70 mt-1">
              Valid at all hospitals, diagnostic centers and blood drives nationwide. Click "Show Back" to view reverse credentials, or download high-res PNG/PDF.
            </p>
          </div>

          {currentIdCard ? (
            <DigitalIdCard idCard={currentIdCard} showSharingControls={true} />
          ) : (
            <p className="text-xs text-charcoal/60">Generating ID Card...</p>
          )}
        </div>
      )}

      {/* TAB 2: 3-MONTH AVAILABILITY ENGINE */}
      {activeTab === 'availability' && (
        <div className="bg-white rounded-3xl border border-gold/40 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h3 className="font-serif font-black text-2xl text-burgundy">
              Automated 3-Month Availability Engine
            </h3>
            <p className="text-xs text-charcoal/70 mt-1">
              Standard medical guideline ensuring donors recover essential hemoglobin levels before undergoing subsequent blood donation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-ivory-light border border-gold/30 space-y-3">
              <span className="text-xs font-bold text-burgundy uppercase block">
                Last Verified Donation
              </span>
              <div className="font-serif font-black text-2xl text-burgundy">
                {donor.lastDonationDate || 'No recorded donations yet'}
              </div>
              <p className="text-xs text-charcoal/70">
                Whenever a hospital or coordinator verifies your donation, our system initiates an automated 3-month platform cooldown.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-ivory-light border border-gold/30 space-y-3">
              <span className="text-xs font-bold text-burgundy uppercase block">
                Next Eligibility Date
              </span>
              <div className="font-serif font-black text-2xl text-crimson">
                {donor.nextEligibleDate || 'Eligible Now'}
              </div>
              <div className="pt-1">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    isAvailable
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {isAvailable ? 'Status: Currently Available' : 'Status: In Cooldown'}
                </span>
              </div>
            </div>
          </div>

          {/* Availability Control Button */}
          <div className="p-5 rounded-2xl bg-ivory border border-gold/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="font-bold text-sm text-burgundy block">
                Manual Availability Override
              </span>
              <span className="text-xs text-charcoal/70">
                You can temporarily pause your availability if traveling, unwell, or unavailable.
              </span>
            </div>

            {isAvailable ? (
              <button
                onClick={() => handleToggleAvailability('UNAVAILABLE_TEMPORARY')}
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
              >
                Set as Temporarily Unavailable
              </button>
            ) : (
              <button
                onClick={() => handleToggleAvailability('AVAILABLE')}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
              >
                Mark as Available Now
              </button>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: DONATION HISTORY & REVIEWS */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-3xl border border-gold/40 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-black text-2xl text-burgundy">
                Recipient Reviews & Star Ratings
              </h3>
              <p className="text-xs text-charcoal/70 mt-1">
                Verified reviews from patients and hospital guardians you have helped.
              </p>
            </div>
            <div className="text-right">
              <div className="font-serif font-black text-3xl text-burgundy">
                {donor.averageRating} / 5.0
              </div>
              <div className="flex items-center gap-0.5 justify-end mt-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="p-4 rounded-2xl bg-ivory-light border border-gold/30 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-burgundy">
                    {r.reviewerName} ({r.reviewerRole})
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <span>{r.rating}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </div>
                </div>
                <p className="text-xs text-charcoal/80 leading-relaxed">"{r.feedback}"</p>
                <span className="text-[10px] text-charcoal/50 block">
                  {new Date(r.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CERTIFICATES */}
      {activeTab === 'certificates' && (
        <div className="bg-white rounded-3xl border border-gold/40 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h3 className="font-serif font-black text-2xl text-burgundy">
              Appreciation Certificates
            </h3>
            <p className="text-xs text-charcoal/70 mt-1">
              Official Certificates of Appreciation issued by the Bangladesh Directorate General of Health Services (DGHS).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-6 rounded-2xl bg-gradient-to-br from-ivory-light via-white to-ivory-light border-2 border-gold shadow-md relative overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-gold/30 pb-2 mb-3">
                  <span className="text-[10px] uppercase font-bold text-gold-dark">
                    Official Recognition
                  </span>
                  <span className="font-mono text-xs font-bold text-charcoal/60">
                    {cert.certificateNumber}
                  </span>
                </div>

                <h4 className="font-serif font-black text-lg text-burgundy">
                  Certificate of Appreciation
                </h4>
                <p className="text-xs text-charcoal/80 mt-1 leading-relaxed">
                  Presented to <span className="font-bold text-burgundy">{cert.donorName}</span> in recognition of voluntarily donating blood at {cert.hospitalOrEvent}.
                </p>

                <div className="mt-4 pt-3 border-t border-gold/20 flex items-center justify-between text-xs">
                  <span className="text-charcoal/60 text-[11px]">Issued: {cert.issueDate}</span>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1 text-xs font-bold text-crimson hover:underline"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Certificate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
