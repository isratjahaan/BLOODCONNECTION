import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { bloodConnectionStore } from '../services/store';
import { useAuth } from '../context/AuthContext';
import {
  MapPin,
  Clock,
  Star,
  Award,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Heart,
  Droplet,
  Send,
  MessageSquare,
  AlertTriangle,
} from 'lucide-react';

export const DonorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();

  const donor = bloodConnectionStore.getDonorById(id || '');
  const reviews = id ? bloodConnectionStore.getReviewsByDonorId(id) : [];

  const [newRating, setNewRating] = useState<number>(5);
  const [newFeedback, setNewFeedback] = useState<string>('');
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);

  if (!donor) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-gold/40 text-center max-w-md">
          <Droplet className="w-12 h-12 text-crimson mx-auto mb-3" />
          <h2 className="font-serif font-bold text-xl text-burgundy">Donor Not Found</h2>
          <p className="text-xs text-charcoal/70 mt-1 mb-4">
            The donor profile you requested does not exist or has been removed.
          </p>
          <Link
            to="/donors"
            className="px-4 py-2 bg-gold text-burgundy font-bold text-xs rounded-lg"
          >
            Back to Donor Search
          </Link>
        </div>
      </div>
    );
  }

  const isAvailable = donor.availabilityStatus === 'AVAILABLE';

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;

    bloodConnectionStore.addReview({
      donorId: donor.id,
      reviewerId: currentUser ? currentUser.id : 'guest-reviewer',
      reviewerName: currentUser ? currentUser.fullName : 'Verified Healthcare Seeker',
      reviewerRole: currentUser ? currentUser.role : 'Recipient',
      rating: newRating,
      feedback: newFeedback,
      isVerifiedInteraction: true,
    });

    setReviewSubmitted(true);
    setNewFeedback('');
  };

  return (
    <div className="bg-ivory min-h-screen py-10 text-charcoal">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header Card */}
        <div className="rounded-3xl bg-white border-2 border-gold/40 p-6 md:p-8 shadow-royal mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar & Blood Group Badge */}
            <div className="relative flex-shrink-0">
              <img
                src={donor.profile.avatarUrl}
                alt={donor.profile.fullName}
                className="w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover border-4 border-gold shadow-gold-glow"
              />
              <div className="absolute -bottom-2 -right-2 bg-crimson border-2 border-gold text-white font-black text-xl px-2.5 py-0.5 rounded-lg shadow-md">
                {donor.bloodGroup}
              </div>
            </div>

            {/* Profile Core Details */}
            <div className="flex-1 text-center md:text-left min-w-0">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
                <h1 className="font-serif font-black text-2xl sm:text-3xl text-burgundy">
                  {donor.profile.fullName}
                </h1>
                {donor.profile.isVerified && (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold-light/40 border border-gold text-burgundy-dark text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
                    <span>Verified Voluntary Donor</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-charcoal/80 my-2">
                <span className="flex items-center gap-1 font-medium capitalize">
                  <MapPin className="w-3.5 h-3.5 text-crimson" />
                  {donor.profile.upazilaId ? `${donor.profile.upazilaId}, ` : ''}
                  {donor.profile.districtId}, {donor.profile.divisionId} Division
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{donor.averageRating}</span> ({donor.reviewsCount} reviews)
                </span>
              </div>

              {/* 3-Month Availability Badge Box */}
              <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 rounded-xl border text-xs font-bold shadow-sm">
                <Clock className="w-4 h-4 text-crimson" />
                <span>Status: </span>
                <span
                  className={
                    isAvailable
                      ? 'text-emerald-700 font-extrabold'
                      : 'text-amber-800 font-extrabold'
                  }
                >
                  {isAvailable ? 'AVAILABLE FOR DONATION' : 'TEMPORARY 3-MONTH COOLDOWN'}
                </span>
                {donor.nextEligibleDate && (
                  <span className="text-[11px] font-normal text-charcoal/70">
                    (Next eligible: {donor.nextEligibleDate})
                  </span>
                )}
              </div>
            </div>

            {/* Quick Metrics Column */}
            <div className="flex md:flex-col gap-3 w-full md:w-auto">
              <div className="flex-1 bg-ivory-light border border-gold/30 rounded-xl p-3 text-center">
                <span className="text-[10px] text-charcoal/70 uppercase block font-bold">
                  Verified Donations
                </span>
                <span className="font-serif font-black text-2xl text-burgundy">
                  {donor.verifiedDonationsCount}
                </span>
              </div>
              <div className="flex-1 bg-ivory-light border border-gold/30 rounded-xl p-3 text-center">
                <span className="text-[10px] text-charcoal/70 uppercase block font-bold">
                  Total Units
                </span>
                <span className="font-serif font-black text-2xl text-crimson">
                  {donor.totalUnitsDonated}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Month Automated Availability Safety Notice */}
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 mb-8 flex items-start gap-3 text-xs text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Medical Safety & Eligibility Protocol:</span> The 3-month platform cooldown is an automated safety interval and does not constitute medical clearance. Actual clinical eligibility requires screening by authorized physicians and blood banks at the time of donation.
          </div>
        </div>

        {/* Achievement Badges Section */}
        <div className="bg-white rounded-2xl border border-gold/40 p-6 shadow-sm mb-8">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gold/20">
            <Award className="w-5 h-5 text-gold-metallic" />
            <h3 className="font-serif font-bold text-lg text-burgundy">
              Verified Achievement Badges
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {donor.badges.map((badge) => (
              <div
                key={badge.id}
                className="p-3.5 rounded-xl bg-ivory-light border border-gold/30 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-burgundy text-gold flex items-center justify-center flex-shrink-0 font-bold shadow-sm">
                  ★
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-burgundy">
                    {badge.name}
                  </h4>
                  <p className="text-[11px] text-charcoal/70 mt-0.5 leading-tight">
                    {badge.description}
                  </p>
                  <span className="text-[9.5px] text-gold-dark font-medium block mt-1">
                    Earned: {badge.earnedDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews & Feedback Section */}
        <div className="bg-white rounded-2xl border border-gold/40 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gold/20">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <h3 className="font-serif font-bold text-lg text-burgundy">
                Recipient Feedback & Reviews ({reviews.length})
              </h3>
            </div>
          </div>

          {/* List of Reviews */}
          <div className="space-y-4 mb-8">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-xl bg-ivory-light border border-gold/20"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-burgundy">
                      {rev.reviewerName}
                    </span>
                    <span className="text-[10px] text-charcoal/60">
                      ({rev.reviewerRole})
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-charcoal/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-charcoal/80 leading-relaxed">
                  "{rev.feedback}"
                </p>
              </div>
            ))}
          </div>

          {/* Leave a Review Form */}
          <div className="pt-4 border-t border-gold/20">
            <h4 className="font-serif font-bold text-sm text-burgundy mb-2">
              Leave a Verified Review
            </h4>

            {reviewSubmitted ? (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Thank you! Your feedback has been recorded and factored into the donor score.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-charcoal/80">Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-0.5"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= newRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-charcoal/30'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows={3}
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                  placeholder="Share your experience (promptness, communication, hospital interaction)..."
                  required
                  className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                />

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-burgundy hover:bg-crimson text-gold text-xs font-bold transition-colors"
                >
                  Submit Feedback
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
