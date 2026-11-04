import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { bloodConnectionStore } from '../services/store';
import { Logo } from '../components/common/Logo';
import { DigitalIdCard } from '../types';
import { QrScannerModal } from '../components/id/QrScannerModal';
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
  Search,
  Camera,
  QrCode,
  ArrowRight,
} from 'lucide-react';

export const QrVerificationPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [decodedCard, setDecodedCard] = useState<DigitalIdCard | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Decode ?d= parameter if present (universal cross-device payload)
  useEffect(() => {
    const encodedData = searchParams.get('d');
    if (encodedData) {
      try {
        const jsonStr = decodeURIComponent(escape(atob(encodedData)));
        const p = JSON.parse(jsonStr);
        const card: DigitalIdCard = {
          id: `id-${p.t || 'temp'}`,
          userId: `user-${p.t || 'temp'}`,
          role: p.r || 'DONOR',
          idNumber: p.i || 'BC-DON-VERIFIED',
          verificationToken: p.t || token || 'verified-token',
          fullName: p.n || 'Verified Member',
          bloodGroup: p.b || 'O+',
          avatarUrl: p.a || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256',
          assignedDistrict: p.d,
          assignedUpazila: p.u,
          organizationName: p.o,
          status: p.s || 'ACTIVE',
          issueDate: p.iss || new Date().toISOString().split('T')[0],
          expiryDate: p.exp,
          donationCount: 0,
          qrPayload: window.location.href,
        };
        setDecodedCard(card);
        bloodConnectionStore.saveIdCard(card);
      } catch (err) {
        console.error('Failed to decode QR payload:', err);
      }
    }
  }, [searchParams, token]);

  const storeCard = token ? bloodConnectionStore.getIdCardByToken(token) : undefined;
  const cardData = decodedCard || storeCard;

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/verify/${encodeURIComponent(searchQuery.trim())}`);
    }
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

  // If no card is found or no token provided, show interactive Scanner & Lookup Portal
  if (!cardData) {
    return (
      <div className="bg-ivory min-h-screen py-16 px-4 flex items-center justify-center">
        <div className="max-w-lg w-full bg-white rounded-3xl border-2 border-gold/40 p-6 sm:p-8 text-center shadow-royal">
          <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-4 text-burgundy border border-gold/40">
            <QrCode className="w-8 h-8" />
          </div>

          <h2 className="font-serif font-black text-2xl text-burgundy">
            National ID Verification Portal
          </h2>
          <p className="text-xs text-charcoal/70 mt-1.5 mb-6 max-w-sm mx-auto">
            {token
              ? `The token or ID "${token}" was not found in local cache. You can scan the QR code live with camera, or enter the ID number below.`
              : 'Scan any official Blood Connection ID Card with your camera or enter the Registry ID number to verify authenticity.'}
          </p>

          {/* Action 1: Launch Camera Scanner */}
          <button
            onClick={() => setIsScannerOpen(true)}
            className="w-full py-3.5 px-4 mb-4 rounded-2xl bg-burgundy hover:bg-crimson text-gold font-bold text-sm shadow-royal transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <Camera className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
            <span>Open Live Camera & File Scanner</span>
          </button>

          {/* Action 2: Search by ID */}
          <form onSubmit={handleManualSearch} className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Registry ID (e.g. BC-DON-2026-94650)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-gold/50 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-burgundy"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-gold hover:bg-gold-light text-burgundy rounded-lg font-bold text-xs flex items-center justify-center shadow cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Sample quick test IDs */}
          <div className="pt-4 border-t border-gold/20 text-left">
            <p className="text-[11px] font-bold text-charcoal/60 uppercase tracking-wider mb-2">
              Try Sample Verified Members:
            </p>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              {[
                { token: 'bc-token-donor1', label: 'Tariqul Islam (A+ Donor)' },
                { token: 'bc-token-superadmin', label: 'Dr. Aminul Islam (Admin)' },
                { token: 'bc-token-distcoord', label: 'Farhana Akter (Coord)' },
                { token: 'bc-token-volunteer', label: 'Nusrat Jahan (Volunteer)' },
              ].map((s) => (
                <Link
                  key={s.token}
                  to={`/verify/${s.token}`}
                  className="p-2 rounded-xl bg-ivory hover:bg-gold/15 border border-gold/30 text-burgundy font-medium text-left truncate flex items-center justify-between"
                >
                  <span className="truncate">{s.label}</span>
                  <ArrowRight className="w-3 h-3 text-gold flex-shrink-0 ml-1" />
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gold/20">
            <Link
              to="/"
              className="text-xs text-burgundy font-bold hover:underline"
            >
              Return to Homepage
            </Link>
          </div>
        </div>

        <QrScannerModal
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
        />
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
                Unique Registry ID: <span className="text-crimson font-black">{cardData.idNumber}</span>
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
              <span className="font-serif font-black text-xl text-crimson">
                {cardData.bloodGroup || 'Staff / Non-Donor'}
              </span>
            </div>

            <div className="p-3 bg-ivory-light rounded-xl border border-gold/20">
              <span className="text-charcoal/60 text-[10px] uppercase font-bold block">
                Verified Donations
              </span>
              <span className="font-serif font-black text-xl text-burgundy">
                {cardData.donationCount ?? ((cardData as any).donor?.verifiedDonationsCount ?? '0')}
              </span>
            </div>

            <div className="p-3 bg-ivory-light rounded-xl border border-gold/20">
              <span className="text-charcoal/60 text-[10px] uppercase font-bold block">
                Assigned Jurisdiction
              </span>
              <span className="font-bold text-charcoal truncate block mt-0.5">
                {cardData.assignedDistrict || cardData.assignedDivision || 'National Level'}
              </span>
            </div>

            <div className="p-3 bg-ivory-light rounded-xl border border-gold/20">
              <span className="text-charcoal/60 text-[10px] uppercase font-bold block">
                Issue / Expiry Date
              </span>
              <span className="font-mono text-charcoal text-[11px] block mt-0.5">
                {cardData.issueDate} / {cardData.expiryDate || 'PERPETUAL'}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-gold/20 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={copyLink}
                className="px-3.5 py-2 rounded-xl bg-ivory-light border border-gold/40 text-xs font-bold hover:bg-gold-light/30 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-crimson" />
                <span>{copied ? 'Link Copied!' : 'Share URL'}</span>
              </button>

              <button
                onClick={() => setIsScannerOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-gold/15 border border-gold/40 text-xs font-bold text-burgundy hover:bg-gold/30 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-burgundy" />
                <span>Scan Another</span>
              </button>
            </div>

            <Link
              to="/donors"
              className="px-4 py-2 rounded-xl bg-burgundy hover:bg-crimson text-gold text-xs font-bold transition-colors shadow"
            >
              Search Donors
            </Link>
          </div>
        </div>
      </div>

      <QrScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
      />
    </div>
  );
};
