import React from 'react';
import { bloodConnectionStore } from '../services/store';
import {
  Building,
  Users,
  MapPin,
  Mail,
  Phone,
  Globe,
  ShieldCheck,
  Award,
} from 'lucide-react';

export const OrganizationsPage: React.FC = () => {
  const orgs = bloodConnectionStore.getOrganizations();

  return (
    <div className="bg-ivory min-h-screen py-10 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="font-serif font-black text-3xl sm:text-4xl text-burgundy">
            Partner Blood Donation Organizations
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-2">
            Recognized national clubs, humanitarian foundations, medical colleges, and university blood networks across Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orgs.map((org) => (
            <div
              key={org.id}
              className="rounded-3xl bg-white border-2 border-gold/40 p-6 sm:p-8 shadow-sm hover:shadow-card-gold transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={org.logoUrl}
                      alt={org.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-gold shadow-sm flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-serif font-bold text-lg text-burgundy leading-snug">
                        {org.name}
                      </h3>
                      {org.bnName && (
                        <p className="text-xs text-gold-dark font-medium">{org.bnName}</p>
                      )}
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-gold/20 text-burgundy-dark border border-gold flex-shrink-0">
                    {org.type}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-charcoal/80 mb-6 bg-ivory-light p-4 rounded-2xl border border-gold/20">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-crimson flex-shrink-0" />
                    <span>{org.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-crimson flex-shrink-0" />
                    <span>{org.contactEmail}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-crimson flex-shrink-0" />
                    <span>{org.contactPhone}</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gold/20 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-charcoal/60 uppercase block">Active Donors</span>
                  <span className="font-serif font-black text-lg text-burgundy">
                    {org.memberCount.toLocaleString()} members
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-charcoal/60 uppercase block">Total Organized</span>
                  <span className="font-serif font-black text-lg text-crimson">
                    {org.totalDonationsOrganized.toLocaleString()} units
                  </span>
                </div>

                <div className="flex items-center gap-1 text-gold-dark font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>DGHS Accredited</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
