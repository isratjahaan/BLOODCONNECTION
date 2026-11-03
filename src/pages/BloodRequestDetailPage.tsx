import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { bloodConnectionStore } from '../services/store';
import { useAuth } from '../context/AuthContext';
import {
  HeartHandshake,
  MapPin,
  Calendar,
  Clock,
  PhoneCall,
  User,
  Users,
  CheckCircle2,
  Droplet,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

export const BloodRequestDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser, currentRole } = useAuth();
  const [responded, setResponded] = useState(false);

  const request = bloodConnectionStore.getRequestById(id || '');

  if (!request) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-gold/40 text-center max-w-md">
          <Droplet className="w-12 h-12 text-crimson mx-auto mb-3" />
          <h2 className="font-serif font-bold text-xl text-burgundy">Request Not Found</h2>
          <p className="text-xs text-charcoal/70 mt-1 mb-4">
            This blood transfusion request does not exist or has expired.
          </p>
          <Link
            to="/requests"
            className="px-4 py-2 bg-gold text-burgundy font-bold text-xs rounded-lg"
          >
            Back to Blood Requests
          </Link>
        </div>
      </div>
    );
  }

  const matchingDonors = bloodConnectionStore.getMatchingDonors(
    request.bloodGroup,
    request.districtId
  );

  const handleRespond = () => {
    setResponded(true);
  };

  return (
    <div className="bg-ivory min-h-screen py-10 text-charcoal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border-2 border-gold/40 p-6 sm:p-10 shadow-royal mb-8">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold/20 pb-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-crimson text-white font-black text-3xl flex items-center justify-center border-2 border-gold shadow flex-shrink-0">
                {request.bloodGroup}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      request.urgency === 'CRITICAL'
                        ? 'bg-red-100 text-red-800 border border-red-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {request.urgency}
                  </span>
                  <span className="text-xs font-bold text-charcoal/60 uppercase">
                    ID: {request.id}
                  </span>
                </div>
                <h1 className="font-serif font-black text-2xl sm:text-3xl text-burgundy mt-1">
                  Patient: {request.patientName}
                </h1>
              </div>
            </div>

            <div className="text-right sm:text-right">
              <div className="text-xs text-charcoal/70">Required Units</div>
              <div className="font-serif font-black text-2xl text-crimson">
                {request.fulfilledUnits} / {request.requiredUnits} Units Fulfilled
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-ivory-light p-4 rounded-2xl border border-gold/20 space-y-2 text-xs">
              <h3 className="font-serif font-bold text-sm text-burgundy border-b border-gold/20 pb-1">
                Hospital & Location Details
              </h3>
              <p>
                <span className="font-bold text-burgundy">Hospital:</span> {request.hospitalName}
              </p>
              <p>
                <span className="font-bold text-burgundy">Ward / Bed / Address:</span> {request.hospitalAddress}
              </p>
              <p className="capitalize">
                <span className="font-bold text-burgundy">Jurisdiction:</span> {request.upazilaId},{' '}
                {request.districtId}, {request.divisionId} Division
              </p>
              <p>
                <span className="font-bold text-burgundy">Transfusion Date & Time:</span>{' '}
                {request.requiredDate} at {request.requiredTime}
              </p>
            </div>

            <div className="bg-ivory-light p-4 rounded-2xl border border-gold/20 space-y-2 text-xs">
              <h3 className="font-serif font-bold text-sm text-burgundy border-b border-gold/20 pb-1">
                Attending Contact Person
              </h3>
              <p>
                <span className="font-bold text-burgundy">Name:</span> {request.contactPerson}
              </p>
              <p>
                <span className="font-bold text-burgundy">Phone:</span>{' '}
                <a
                  href={`tel:${request.contactPhone}`}
                  className="text-crimson font-bold hover:underline"
                >
                  {request.contactPhone}
                </a>
              </p>
              <p>
                <span className="font-bold text-burgundy">Status:</span>{' '}
                <span className="uppercase text-emerald-700 font-bold">{request.status}</span>
              </p>
              {request.additionalNotes && (
                <p className="pt-1 italic text-charcoal/70">
                  Notes: "{request.additionalNotes}"
                </p>
              )}
            </div>
          </div>

          {/* Respond Action Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-burgundy to-crimson text-white border-2 border-gold flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif font-bold text-lg text-gold-metallic">
                Are you eligible to donate for {request.patientName}?
              </h4>
              <p className="text-xs text-ivory-light/90 mt-0.5">
                Must be at least 3 months since your last donation and in good health.
              </p>
            </div>

            {responded ? (
              <div className="px-5 py-2.5 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow">
                <CheckCircle2 className="w-4 h-4" />
                <span>Response Registered! Attendant Notified.</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <a
                  href={`tel:${request.contactPhone}`}
                  className="px-4 py-2.5 rounded-full bg-white text-burgundy font-bold text-xs flex items-center gap-1.5 shadow"
                >
                  <PhoneCall className="w-4 h-4 text-crimson" />
                  <span>Call Hospital</span>
                </a>
                <button
                  onClick={handleRespond}
                  className="px-5 py-2.5 rounded-full bg-gold-metallic-gradient text-burgundy-dark font-extrabold text-xs shadow-gold-glow hover:scale-105 transition-all"
                >
                  Accept & Pledge Blood
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Nearby Eligible Donors for this Request */}
        <div className="bg-white rounded-3xl border border-gold/40 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gold/20">
            <Users className="w-5 h-5 text-crimson" />
            <h3 className="font-serif font-bold text-lg text-burgundy">
              Matched Nearby Available Donors ({matchingDonors.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {matchingDonors.map((d) => (
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
                      {d.bloodGroup} • {d.verifiedDonationsCount} donations
                    </span>
                  </div>
                </div>

                <Link
                  to={`/donors/${d.id}`}
                  className="px-3 py-1 bg-burgundy hover:bg-crimson text-gold text-[11px] font-bold rounded-lg transition-colors"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
