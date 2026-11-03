import React from 'react';
import { bloodConnectionStore } from '../services/store';
import {
  Calendar,
  MapPin,
  Clock,
  PhoneCall,
  Users,
  Droplet,
  CheckCircle2,
} from 'lucide-react';

export const CampaignsPage: React.FC = () => {
  const campaigns = bloodConnectionStore.getCampaigns();

  return (
    <div className="bg-ivory min-h-screen py-10 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="font-serif font-black text-3xl sm:text-4xl text-burgundy">
            Nationwide Blood Donation Campaigns & Drives
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-2">
            Participate in voluntary community blood donation drives across universities, stadiums, medical colleges and public venues.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="bg-white rounded-3xl border-2 border-gold/40 p-6 sm:p-8 shadow-royal flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold/20 text-burgundy border border-gold">
                    {camp.organizationName}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
                    {camp.status}
                  </span>
                </div>

                <h3 className="font-serif font-black text-xl sm:text-2xl text-burgundy mb-2">
                  {camp.title}
                </h3>
                {camp.bnTitle && (
                  <p className="text-xs text-gold-dark font-medium mb-3">{camp.bnTitle}</p>
                )}

                <p className="text-xs text-charcoal/80 leading-relaxed mb-6">
                  {camp.description}
                </p>

                <div className="bg-ivory-light p-4 rounded-2xl border border-gold/20 space-y-2 text-xs mb-6">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-crimson flex-shrink-0" />
                    <span className="font-semibold text-charcoal">{camp.venue}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-crimson flex-shrink-0" />
                    <span>
                      {new Date(camp.startDate).toLocaleDateString()} to{' '}
                      {new Date(camp.endDate).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-crimson flex-shrink-0" />
                    <span>Coordinator Helpline: {camp.coordinatorPhone}</span>
                  </p>
                </div>
              </div>

              {/* Progress bar towards target */}
              <div>
                <div className="flex justify-between text-xs font-bold text-charcoal mb-1.5">
                  <span>Target Units: {camp.targetUnits}</span>
                  <span className="text-crimson">{camp.collectedUnits} Collected</span>
                </div>
                <div className="w-full bg-ivory-dark h-2.5 rounded-full overflow-hidden border border-gold/30">
                  <div
                    className="bg-crimson h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (camp.collectedUnits / camp.targetUnits) * 100)}%`,
                    }}
                  />
                </div>

                <div className="mt-5 pt-3 border-t border-gold/20 flex items-center justify-between">
                  <span className="text-[11px] text-charcoal/60">
                    Free diagnostic blood tests & Digital ID cards issued on spot
                  </span>
                  <button
                    onClick={() => alert(`Registered interest for ${camp.title}! Coordinator will reach out.`)}
                    className="px-4 py-2 rounded-lg bg-burgundy hover:bg-crimson text-gold text-xs font-bold transition-colors"
                  >
                    Register to Attend
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
