import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeartHandshake,
  Search,
  Droplet,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const VisitorDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-burgundy via-crimson to-burgundy text-white p-6 rounded-3xl border-2 border-gold shadow-royal flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-gold text-burgundy-dark font-extrabold text-[10px] uppercase">
            🌐 Citizen & Visitor Portal
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-gold-metallic mt-1">
            Bangladesh National Blood Ecosystem
          </h2>
          <p className="text-xs text-ivory/80">
            Emergency helpline access, live donor directory search, and voluntary registration.
          </p>
        </div>

        <Link
          to="/register"
          className="px-5 py-2.5 rounded-full bg-gold-metallic-gradient text-burgundy-dark font-extrabold text-xs shadow-gold-glow hover:scale-105 transition-all self-start sm:self-center"
        >
          Register as Blood Donor
        </Link>
      </div>

      {/* Grid of Public Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gold/40 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-crimson-50 text-crimson flex items-center justify-center mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-burgundy">
              Search Voluntary Donors
            </h3>
            <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">
              Find donors matching blood group, division, district, or thana with verified availability.
            </p>
          </div>
          <Link
            to="/donors"
            className="mt-4 w-full py-2 bg-burgundy hover:bg-crimson text-gold text-xs font-bold rounded-lg text-center block transition-colors"
          >
            Search Donors
          </Link>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gold/40 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-crimson-50 text-crimson flex items-center justify-center mb-3">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-burgundy">
              Post Blood Request
            </h3>
            <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">
              If a patient requires emergency blood, post a hospital request to mobilize community donors.
            </p>
          </div>
          <Link
            to="/blood-request"
            className="mt-4 w-full py-2 bg-gold hover:bg-gold-light text-burgundy-dark text-xs font-black rounded-lg text-center block transition-colors"
          >
            Create Request
          </Link>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gold/40 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-crimson-50 text-crimson flex items-center justify-center mb-3">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-burgundy">
              Emergency Hotlines
            </h3>
            <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">
              National Health Helpline: 16263 • Red Crescent: +88029330188 • Emergency Police/Ambulance: 999
            </p>
          </div>
          <a
            href="tel:16263"
            className="mt-4 w-full py-2 bg-crimson hover:bg-crimson-dark text-white text-xs font-bold rounded-lg text-center block transition-colors"
          >
            Call 16263 (Free)
          </a>
        </div>
      </div>
    </div>
  );
};
