import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { DigitalIdCard as IdCardType } from '../../types';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
  Download,
  Share2,
  Copy,
  Check,
  ShieldCheck,
  RotateCw,
  Printer,
  ExternalLink,
  Award,
  Globe,
  X,
  QrCode,
} from 'lucide-react';

interface DigitalIdCardProps {
  idCard: IdCardType;
  showSharingControls?: boolean;
}

export const DigitalIdCard: React.FC<DigitalIdCardProps> = ({
  idCard,
  showSharingControls = true,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Generate universal cross-device QR code payload (compact for ultra-fast mobile camera scanning)
  const generateVerificationUrl = (card: IdCardType) => {
    try {
      const payload: any = {
        t: card.verificationToken,
        n: card.fullName,
        r: card.role,
        i: card.idNumber,
        b: card.bloodGroup,
        d: card.assignedDistrict,
        u: card.assignedUpazila,
        s: card.status,
        iss: card.issueDate,
        exp: card.expiryDate,
      };
      if (card.organizationName) payload.o = card.organizationName;
      const jsonStr = JSON.stringify(payload);
      const encoded = btoa(unescape(encodeURIComponent(jsonStr)));
      return `${window.location.origin}/verify/${card.verificationToken}?d=${encoded}`;
    } catch {
      return `${window.location.origin}/verify/${card.verificationToken}`;
    }
  };

  const verificationUrl = generateVerificationUrl(idCard);

  const copyVerificationLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Official Blood Connection ID Card — ${idCard.fullName}`,
          text: `Verified ${idCard.role.replace('_', ' ')} Digital Identity for Blood Connection Bangladesh.`,
          url: verificationUrl,
        });
      } catch (err) {
        console.log('Share dismissed or cancelled');
      }
    } else {
      copyVerificationLink();
    }
  };

  const downloadCardAsImage = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, // High DPI for crisp printing
        useCORS: true,
        backgroundColor: null,
      });
      const link = document.createElement('a');
      link.download = `${idCard.idNumber}-ID-Card.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to export ID Card image', err);
    } finally {
      setDownloading(false);
    }
  };

  const downloadCardAsPdf = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#FFFFFF',
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [85.6, 53.98], // Standard ISO/IEC 7810 ID-1 credit card size in mm
      });
      pdf.addImage(imgData, 'PNG', 0, 0, 85.6, 53.98);
      pdf.save(`${idCard.idNumber}-Official-ID.pdf`);
    } catch (err) {
      console.error('Failed to export PDF', err);
    } finally {
      setDownloading(false);
    }
  };

  const printCard = () => {
    window.print();
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
      case 'ADMIN':
        return 'bg-gradient-to-r from-amber-500 to-yellow-600 text-burgundy-dark font-extrabold';
      case 'DIVISION_ADMIN':
      case 'DISTRICT_COORDINATOR':
      case 'UPAZILA_COORDINATOR':
        return 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-bold';
      case 'ORGANIZATION_ADMIN':
        return 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold';
      case 'VOLUNTEER':
        return 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold';
      default:
        return 'bg-crimson text-white font-bold';
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* 3D Flip Card Container */}
      <div className="perspective-1000 w-full max-w-[430px]">
        <div
          ref={cardRef}
          className={`relative w-full aspect-[1.586] rounded-2xl p-0.5 shadow-2xl transition-all duration-700 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #C6A15B 40%, #8B1028 100%)',
          }}
        >
          {/* Card Inner with Royal Burgundy Background & Hologram Watermark */}
          <div className="relative w-full h-full rounded-[14px] bg-gradient-to-br from-burgundy-dark via-burgundy to-[#1A0308] text-white overflow-hidden p-4 sm:p-5 flex flex-col justify-between border border-gold/40">
            {/* Bangladesh Map Watermark in Background */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none flex items-center justify-center">
              <img
                src="/assets/images/blood-connection-logo-final.png"
                alt=""
                className="w-full h-auto object-contain"
              />
            </div>

            {/* FRONT SIDE */}
            {!isFlipped ? (
              <>
                {/* Header: Logo, Republic Header, Status */}
                <div className="flex items-center justify-between border-b border-gold/30 pb-2 z-10">
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/images/blood-connection-logo-final.png"
                      alt="BC Logo"
                      className="w-10 h-10 object-contain"
                    />
                    <div>
                      <h4 className="font-serif font-black text-xs sm:text-sm tracking-wider text-gold-metallic">
                        BLOOD CONNECTION
                      </h4>
                      <p className="text-[8px] uppercase tracking-widest text-gold-champagne font-medium">
                        National Blood Ecosystem Bangladesh
                      </p>
                    </div>
                  </div>

                  {/* Active Status Badge */}
                  <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-[9.5px] font-bold">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>{idCard.status}</span>
                  </div>
                </div>

                {/* Body: Photo, Info, Blood Group Badge */}
                <div className="flex items-center gap-3.5 my-2 z-10">
                  {/* Avatar with Gold Border */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={idCard.avatarUrl}
                      alt={idCard.fullName}
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl object-cover border-2 border-gold shadow-gold-glow"
                    />
                    {idCard.bloodGroup && (
                      <div className="absolute -bottom-1 -right-1 bg-crimson border-2 border-gold text-white font-black text-[11px] px-1.5 py-0.5 rounded-md shadow">
                        {idCard.bloodGroup}
                      </div>
                    )}
                  </div>

                  {/* Identity Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-ivory truncate">
                      {idCard.fullName}
                    </h3>

                    {/* Role Designation */}
                    <div className="inline-block mt-0.5">
                      <span
                        className={`text-[10px] uppercase px-2 py-0.5 rounded-full shadow-sm tracking-wide ${getRoleBadgeColor(
                          idCard.role
                        )}`}
                      >
                        {idCard.role.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-[10px] text-gold-light/90 font-mono mt-1 font-semibold">
                      ID: <span className="text-white">{idCard.idNumber}</span>
                    </p>

                    {(idCard.assignedDistrict || idCard.organizationName) && (
                      <p className="text-[9.5px] text-ivory/80 truncate mt-0.5">
                        {idCard.organizationName || `${idCard.assignedUpazila ? idCard.assignedUpazila + ', ' : ''}${idCard.assignedDistrict}`}
                      </p>
                    )}
                  </div>

                  {/* QR Code on Front (Clickable for Mobile Scan) */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowQrModal(true);
                    }}
                    className="flex-shrink-0 p-1 bg-white rounded-lg shadow-md border-2 border-gold cursor-pointer hover:scale-105 transition-transform"
                    title="Click to enlarge QR code for mobile phone scanning"
                  >
                    <QRCodeSVG
                      value={verificationUrl}
                      size={64}
                      level="M"
                      includeMargin={false}
                    />
                  </div>
                </div>

                {/* Footer: Issue Date, Expiry, Verified Micro-Seal */}
                <div className="flex items-center justify-between border-t border-gold/30 pt-1.5 text-[9px] text-ivory/70 z-10">
                  <div>
                    <span className="text-gold-champagne font-medium">ISSUED: </span>
                    <span className="text-white font-mono">{idCard.issueDate}</span>
                  </div>
                  {idCard.expiryDate && (
                    <div>
                      <span className="text-gold-champagne font-medium">EXPIRES: </span>
                      <span className="text-white font-mono">{idCard.expiryDate}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-gold-light font-semibold">
                    <Award className="w-3 h-3 text-gold" />
                    <span>DGHS COMPLIANT</span>
                  </div>
                </div>
              </>
            ) : (
              /* BACK SIDE */
              <div className="h-full flex flex-col justify-between text-xs z-10">
                <div className="border-b border-gold/30 pb-2">
                  <h4 className="font-serif font-bold text-xs text-gold text-center tracking-wider uppercase">
                    Official National Donor Card
                  </h4>
                  <p className="text-[9px] text-ivory/80 text-center mt-0.5">
                    Government of Bangladesh Healthcare Digital Registry
                  </p>
                </div>

                <div className="space-y-1.5 text-[10px] text-ivory/90 my-auto py-1">
                  <div className="flex justify-between border-b border-gold/10 pb-0.5">
                    <span className="text-gold-champagne">Verification Token:</span>
                    <span className="font-mono text-white text-[9px]">{idCard.verificationToken}</span>
                  </div>
                  <div className="flex justify-between border-b border-gold/10 pb-0.5">
                    <span className="text-gold-champagne">Emergency Contact:</span>
                    <span className="text-white">16263 (National Health Hotline)</span>
                  </div>
                  <div className="flex justify-between border-b border-gold/10 pb-0.5">
                    <span className="text-gold-champagne">3-Month Cooldown Rule:</span>
                    <span className="text-emerald-300 font-semibold">Enforced Automatically</span>
                  </div>
                  <p className="text-[8px] text-ivory/60 leading-tight pt-1">
                    * This digital credential certifies the bearer as a registered participant in the Bangladesh Blood Donation Ecosystem. If found, please return to any authorized medical center.
                  </p>
                </div>

                <div className="border-t border-gold/30 pt-1.5 flex items-center justify-between text-[9px] text-gold-champagne">
                  <span>bloodconnection.org.bd</span>
                  <span>Scan QR on front to verify authenticity</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Bar (Flip, Download, PDF, Share, Print) */}
      {showSharingControls && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 max-w-[430px] w-full">
          {/* Flip Card Button */}
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-burgundy hover:bg-crimson border border-gold/50 text-gold hover:text-white text-xs font-bold transition-all shadow"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{isFlipped ? 'Show Front' : 'Show Back'}</span>
          </button>

          {/* Download Image Button */}
          <button
            onClick={downloadCardAsImage}
            disabled={downloading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-burgundy hover:bg-crimson border border-gold/50 text-gold hover:text-white text-xs font-bold transition-all shadow"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PNG</span>
          </button>

          {/* Download PDF Button */}
          <button
            onClick={downloadCardAsPdf}
            disabled={downloading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-burgundy hover:bg-crimson border border-gold/50 text-gold hover:text-white text-xs font-bold transition-all shadow"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>

          {/* Print Button */}
          <button
            onClick={printCard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-burgundy hover:bg-crimson border border-gold/50 text-gold hover:text-white text-xs font-bold transition-all shadow"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          {/* Mobile Scan Large QR Trigger */}
          <button
            onClick={() => setShowQrModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-burgundy-dark hover:bg-burgundy border-2 border-gold text-gold text-xs font-bold transition-all shadow cursor-pointer"
            title="Open large QR code to easily scan from mobile phone"
          >
            <QrCode className="w-3.5 h-3.5 text-gold" />
            <span>📱 Mobile Scan</span>
          </button>

          {/* Open Verification Portal */}
          <a
            href={verificationUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow"
            title="Open live verification page in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Verify Live</span>
          </a>

          {/* Copy Verification Link */}
          <button
            onClick={copyVerificationLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-burgundy hover:bg-crimson border border-gold/50 text-gold hover:text-white text-xs font-bold transition-all shadow"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>

          {/* Native Share / Social Share */}
          <button
            onClick={handleNativeShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold hover:bg-gold-light text-burgundy text-xs font-extrabold transition-all shadow-gold-glow"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share ID</span>
          </button>
        </div>
      )}

      {/* Large QR Modal for Super Fast Mobile Phone Scanning */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full border-2 border-gold shadow-2xl p-6 text-center flex flex-col items-center relative">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-charcoal/60 hover:text-burgundy transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-burgundy mb-2">
              <QrCode className="w-6 h-6 text-burgundy" />
            </div>

            <h3 className="font-serif font-black text-xl text-burgundy">
              Scan with Mobile Phone
            </h3>
            <p className="text-xs text-charcoal/70 mt-1 mb-4">
              Point your phone camera at this QR code to instantly verify this ID card on your mobile device.
            </p>

            <div className="p-4 bg-white rounded-2xl border-2 border-gold shadow-royal inline-block mb-4">
              <QRCodeSVG
                value={verificationUrl}
                size={220}
                level="M"
                includeMargin={true}
              />
            </div>

            <p className="text-[11px] font-mono text-charcoal/80 font-bold mb-4">
              Registry ID: <span className="text-crimson">{idCard.idNumber}</span>
            </p>

            <div className="flex gap-2 w-full">
              <a
                href={verificationUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-burgundy hover:bg-crimson text-gold font-bold text-xs shadow flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in Tab</span>
              </a>
              <button
                onClick={copyVerificationLink}
                className="flex-1 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-burgundy font-bold text-xs shadow flex items-center justify-center gap-1.5"
              >
                <Copy className="w-4 h-4" />
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
