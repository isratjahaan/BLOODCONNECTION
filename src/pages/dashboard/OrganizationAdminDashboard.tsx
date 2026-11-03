import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { bloodConnectionStore } from '../../services/store';
import { DigitalIdCard } from '../../components/id/DigitalIdCard';
import {
  Building,
  Users,
  Calendar,
  Award,
  PlusCircle,
  CheckCircle2,
  Share2,
} from 'lucide-react';

export const OrganizationAdminDashboard: React.FC = () => {
  const { currentUser, currentIdCard } = useAuth();
  const campaigns = bloodConnectionStore.getCampaigns();
  const orgs = bloodConnectionStore.getOrganizations();
  const org = orgs[0]; // Primary organization

  const [campaignTitle, setCampaignTitle] = useState('');
  const [venue, setVenue] = useState('');
  const [created, setCreated] = useState(false);

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    setCreated(true);
    setTimeout(() => {
      setCreated(false);
      setCampaignTitle('');
      setVenue('');
    }, 2500);
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-burgundy via-crimson to-burgundy text-white p-6 rounded-3xl border-2 border-gold shadow-royal flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-gold text-burgundy-dark font-extrabold text-[10px] uppercase">
            🏥 Organization Portal
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-gold-metallic mt-1">
            {org ? org.name : 'Sandhani Blood Donation Club'}
          </h2>
          <p className="text-xs text-ivory/80">
            Registration: {org?.registrationNo} • Admin: {currentUser?.fullName}
          </p>
        </div>

        <div className="bg-burgundy-dark/90 border border-gold/50 p-3.5 rounded-2xl text-center self-start sm:self-center">
          <span className="text-[10px] uppercase font-bold text-gold-champagne block">
            Active Members
          </span>
          <span className="font-serif font-black text-2xl text-gold-metallic block">
            {org ? org.memberCount : 1850}
          </span>
        </div>
      </div>

      {/* Campaigns Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gold/40 p-6 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-lg text-burgundy">
            Organized Blood Donation Drives
          </h3>

          <div className="space-y-3">
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                className="p-4 rounded-2xl bg-ivory-light border border-gold/30 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-burgundy">
                    {camp.title}
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                    {camp.status}
                  </span>
                </div>
                <p className="text-xs text-charcoal/70">📍 {camp.venue}</p>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-charcoal/60">
                    Collected: <span className="font-bold text-burgundy">{camp.collectedUnits}</span> / {camp.targetUnits} units
                  </span>
                  <span className="font-mono text-gold-dark font-bold text-[11px]">
                    {new Date(camp.startDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule a New Drive */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-gold/40 p-6 shadow-sm">
          <h3 className="font-serif font-bold text-lg text-burgundy mb-4">
            Schedule a New Campaign Drive
          </h3>

          {created ? (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Blood drive registered! National coordinators notified.</span>
            </div>
          ) : (
            <form onSubmit={handleCreateCampaign} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-charcoal/80 mb-1">
                  Drive Title
                </label>
                <input
                  type="text"
                  required
                  value={campaignTitle}
                  onChange={(e) => setCampaignTitle(e.target.value)}
                  placeholder="e.g. DU TSC Winter Blood Camp"
                  className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal/80 mb-1">
                  Location / Venue
                </label>
                <input
                  type="text"
                  required
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g. University Gymnasium"
                  className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-burgundy hover:bg-crimson text-gold font-bold text-xs shadow transition-colors flex items-center justify-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish Drive</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Official Org Digital ID */}
      {currentIdCard && (
        <div className="bg-white rounded-3xl border border-gold/40 p-6 sm:p-8 shadow-sm flex flex-col items-center">
          <h3 className="font-serif font-black text-xl text-burgundy mb-4">
            Official Organization Admin Digital ID
          </h3>
          <DigitalIdCard idCard={currentIdCard} showSharingControls={true} />
        </div>
      )}
    </div>
  );
};
