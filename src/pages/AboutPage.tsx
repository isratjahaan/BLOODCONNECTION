import React from 'react';
import { Logo } from '../components/common/Logo';
import { ShieldCheck, Heart, Award, Globe, Users, Droplet } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-ivory min-h-screen py-12 text-charcoal">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-2">
            <Logo variant="full" linkToHome={false} />
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-burgundy">
            Bangladesh National Blood Donation Ecosystem
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-gold-dark max-w-2xl mx-auto">
            "Connecting Blood Donors. Saving Lives."
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl border-2 border-gold/40 p-8 sm:p-12 shadow-royal space-y-6 text-sm leading-relaxed text-charcoal/90">
          <h2 className="font-serif font-bold text-2xl text-burgundy border-b border-gold/20 pb-2">
            Our Mission & Healthcare Mandate
          </h2>
          <p>
            BLOOD CONNECTION is Bangladesh's unified digital healthcare platform designed to bridge the critical gap between voluntary blood donors and emergency transfusion seekers. Spanning all 8 administrative divisions and 64 districts, our mission is to ensure that no patient loses their life due to a shortage of compatible, safe blood.
          </p>
          <p>
            By integrating strict Row-Level Security, automated 3-month availability cooldowns, cryptographic QR verification, and multi-tier coordinator administration, BLOOD CONNECTION upholds the highest standards of medical safety and ethical donor engagement aligned with the Directorate General of Health Services (DGHS) and the Bangladesh Red Crescent Society.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-ivory-light border border-gold/30 text-center space-y-2">
              <ShieldCheck className="w-8 h-8 text-gold mx-auto" />
              <h3 className="font-serif font-bold text-base text-burgundy">Verified Identity</h3>
              <p className="text-xs text-charcoal/70">
                Every approved donor and coordinator holds an individual Digital ID card with tamper-evident QR verification.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-ivory-light border border-gold/30 text-center space-y-2">
              <Droplet className="w-8 h-8 text-crimson fill-crimson mx-auto" />
              <h3 className="font-serif font-bold text-base text-burgundy">3-Month Cooldown</h3>
              <p className="text-xs text-charcoal/70">
                Automated platform interval protects donor health, enforcing 3 full calendar months of cooldown following verified donations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-ivory-light border border-gold/30 text-center space-y-2">
              <Globe className="w-8 h-8 text-blue-700 mx-auto" />
              <h3 className="font-serif font-bold text-base text-burgundy">64-District Reach</h3>
              <p className="text-xs text-charcoal/70">
                Localized thana and district coordinators ensure emergency requests in remote upazilas receive immediate donor mobilization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
