import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { bloodConnectionStore } from '../services/store';
import { Logo } from '../components/common/Logo';
import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Clock,
  CheckCircle2,
  Calendar,
  Building,
  MapPin,
  Award,
  Globe,
  Share2,
} from 'lucide-react';

export const QrVerificationPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [copied, setCopied] = useState(false);

  const cardData = token ? bloodConnectionStore.getIdCardByToken(token) : undefined;

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return {
          icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
          title: 'OFFICIALLY VERIFIED & ACTIVE',
          bg: 'bg-emerald-50 border-emerald-400 text-emerald-800',
          desc: 'This digital identity is authentic, currently valid, and registered in the Bangladesh National Blood Board repository.',
        };
      case 'SUSPENDED':
        return {
          icon: <ShieldAlert className="w-6 h-6 text-amber-500" />,
          title: 'IDENTITY TEMPORARILY SUSPENDED',
          bg: 'bg-amber-50 border-amber-400 text-amber-800',
          desc: 'This credential is under temporary administrative review or medical pause.',
        };
      case 'REVOKED':
        return {
          icon: <ShieldX className="w-6 h-6 text-red-500" />,
          title: 'IDENTITY REVOKED',
          bg: 'bg-red-50 border-red-400 text-red-800',
          desc: 'This ID credential was permanently revoked by central administration.',
        };
      default:
        return {
          icon: <Clock className="w-6 h-6 text-blue-500" />,
          title: 'PENDING VERIFICATION',
          bg: 'bg-blue-50 border-blue-400 text-blue-800',
          desc: 'This credential is awaiting final district coordinator sign-off.',
        };
    }
  };

  if (!cardData) {
    return (
      <div className="bg-ivory min-h-screen py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl border-2 border-red-300 p-8 text-center shadow-royal">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 text-red-600">
            <ShieldX className="w-9 h-9" />
          </div>
          <h2 className="font-serif font-black text-2xl text-burgundy">
            Invalid Verification Token
          </h2>
          <p className="text-xs text-charcoal/70 mt-2 mb-6">
            The scanned QR code or verification token does not match any official registry entry in the Bangladesh National Blood Connection.
          </p>
          <Link
            to="/"
            className="px-5 py-2.5 rounded-full bg-burgundy hover:bg-crimson text-gold font-bold text-xs shadow"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusBadge(cardData.status);

  return (
    <div className="bg-ivory min-h-screen py-12 px-4 flex items-center justify-center text-charcoal">
      <div className="max-w-xl w-full bg-white rounded-3xl border-2 border-gold/50 shadow-royal overflow-hidden">
        {/* Verification Header Banner */}
        <div className="bg-burgundy text-white p-6 text-center border-b-2 border-gold relative">
          <div className="flex justify-center mb-2">
            <Logo variant="compact" linkToHome={false} />
          </div>
          <h1 className="font-serif font-black text-xl sm:text-2xl text-gold-metallic">
            Official Credential Verification Portal
          </h1>
          <p className="text-[11px] text-ivory-light/80 uppercase tracking-widest mt-0.5">
            Directorate General of Health Services (DGHS) Aligned Registry
          </p>
        </div>

        {/* Verification Status Banner */}
        <div className={`p-4 border-b flex items-start gap-3.5 ${statusConfig.bg}`}>
          <div className="flex-shrink-0">{statusConfig.icon}</div>
          <div>
            <h3 className="font-serif font-black text-sm uppercase tracking-wide">
              {statusConfig.title}
            </h3>
            <p className="text-xs mt-0.5 leading-relaxed">{statusConfig.desc}</p>
          </div>
        </div>

        {/* Identity Details Card */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={cardData.avatarUrl}
              alt=""
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-gold shadow-md flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h2 className="font-serif font-black text-xl sm:text-2xl text-burgundy truncate">
                {cardData.fullName}
              </h2>
              <div className="inline-block mt-1">
                <span className="px-2.5 py-0.5 rounded-full bg-burgundy text-gold font-black text-xs uppercase tracking-wide">
                  {cardData.role.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs font-mono text-charcoal/70 mt-1.5 font-bold">
                Unique Registry ID: <span className="text-crimson">{cardData.idNumber}</span>
              </p>
            </div>
          </div>

          {/* Privacy Protection Notice */}
          <div className="bg-ivory-light p-3 rounded-xl border border-gold/20 text-[11px] text-charcoal/70 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              In accordance with national healthcare privacy protocols, exact home addresses and private phone numbers are shielded from public QR scans.
            </span>
          </div>

          {/* Verified Parameters Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-ivory-light rounded-xl border border-gold/20">
              <span className="text-charcoal/60 text-[10px] uppercase font-bold block">
                Official Blood Group
              </span>
              <span className="font-serif font-black text-lg text-crimson">
                {cardData.bloodGroup || 'Staff / Non-Donor'}
              </span>
            </div>

            <div className="p-3 bg-ivory-light rounded-xl border border-gold/20">
              <span className="text-charcoal/60 text-[10px] uppercase font-bold block">
                Verified Donations
              </span>
              <span className="font-serif font-black text-lg text-burgundy">
                {cardData.donationCount ?? (cardData.donor ? cardData.donor.verifiedDonationsCount : 'N/A')}
              </span>
            </div>

            <div className="p-3 bg-ivory-light rounded-xl border border-gold/20">
              <span className="text-charcoal/60 text-[10px] uppercase font-bold block">
                Assigned Jurisdiction
              </span>
              <span className="font-bold text-charcoal truncate block">
                {cardData.assignedDistrict || cardData.assignedDivision || 'National Level'}
              </span>
            </div>

            <div className="p-3 bg-ivory-light rounded-xl border border-gold/20">
              <span className="text-charcoal/60 text-[10px] uppercase font-bold block">
                Issue / Expiry Date
              </span>
              <span className="font-mono text-charcoal text-[11px] block">
                {cardData.issueDate} / {cardData.expiryDate || 'PERPETUAL'}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-gold/20 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={copyLink}
              className="px-4 py-2 rounded-lg bg-ivory-light border border-gold/40 text-xs font-bold hover:bg-gold-light/30 transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5 text-crimson" />
              <span>{copied ? 'Link Copied!' : 'Share Verification URL'}</span>
            </button>

            <Link
              to="/donors"
              className="px-4 py-2 rounded-lg bg-burgundy hover:bg-crimson text-gold text-xs font-bold transition-colors"
            >
              Search Verified Donors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
