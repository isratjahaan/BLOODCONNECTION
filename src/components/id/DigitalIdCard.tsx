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
  const exportCardRef = useRef<HTMLDivElement>(null);
  const exportBackRef = useRef<HTMLDivElement>(null);

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
    const target = exportCardRef.current || cardRef.current;
    if (!target) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(target, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#4A0D1C',
      });
      const link = document.createElement('a');
      link.download = `${idCard.idNumber}-Official-ID.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to export ID Card image', err);
    } finally {
      setDownloading(false);
    }
  };

  const downloadCardAsPdf = async () => {
    const frontEl = exportCardRef.current || cardRef.current;
    if (!frontEl) return;
    setDownloading(true);
    try {
      // 1. Capture Front Side
      const frontCanvas = await html2canvas(frontEl, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: '#4A0D1C',
      });
      const frontImg = frontCanvas.toDataURL('image/png');

      // 2. Capture Back Side if available
      let backImg: string | null = null;
      if (exportBackRef.current) {
        const backCanvas = await html2canvas(exportBackRef.current, {
          scale: 2.5,
          useCORS: true,
          backgroundColor: '#3A0713',
        });
        backImg = backCanvas.toDataURL('image/png');
      }

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Republic Official Header
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9.5);
      pdf.setTextColor(60, 60, 60);
      pdf.text(
        "PEOPLE'S REPUBLIC OF BANGLADESH • DIRECTORATE GENERAL OF HEALTH SERVICES",
        105,
        22,
        { align: 'center' }
      );
      pdf.setFontSize(13);
      pdf.setTextColor(139, 16, 40); // Royal Crimson
      pdf.text(
        "NATIONAL BLOOD CONNECTION • OFFICIAL VOLUNTARY DONOR BADGE",
        105,
        29,
        { align: 'center' }
      );
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(110, 110, 110);
      pdf.text(
        "Standard PVC Badge Format (CR80: 85.6 mm x 54.0 mm) • Verified National Repository",
        105,
        35,
        { align: 'center' }
      );

      // Card Dimensions
      const cardW = 85.6;
      const cardH = 54.0;
      const cardX = (210 - cardW) / 2; // 62.2 mm

      // 1. FRONT SIDE
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.5);
      pdf.setTextColor(100, 100, 100);
      pdf.text("CARD FRONT (সম্মুখভাগ)", 105, 42, { align: 'center' });
      pdf.addImage(frontImg, 'PNG', cardX, 45, cardW, cardH);

      // Cutting guideline for front
      pdf.setDrawColor(180, 180, 180);
      pdf.setLineDashPattern([2, 2], 0);
      pdf.rect(cardX - 1, 44, cardW + 2, cardH + 2);

      // 2. BACK SIDE (if captured)
      if (backImg) {
        pdf.setLineDashPattern([], 0);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(7.5);
        pdf.setTextColor(100, 100, 100);
        pdf.text("CARD BACK (বিপরীতভাগ)", 105, 109, { align: 'center' });
        pdf.addImage(backImg, 'PNG', cardX, 112, cardW, cardH);

        // Cutting guideline for back
        pdf.setDrawColor(180, 180, 180);
        pdf.setLineDashPattern([2, 2], 0);
        pdf.rect(cardX - 1, 111, cardW + 2, cardH + 2);
      }

      // Cutting Guideline instruction
      pdf.setLineDashPattern([], 0);
      pdf.setFontSize(7.5);
      pdf.setTextColor(120, 120, 120);
      pdf.text(
        "✂ Cut along the dotted line and fold in half (কাঁচি দিয়ে ডটেড লাইন বরাবর কাটুন ও ভাঁজ করুন)",
        105,
        backImg ? 173 : 106,
        { align: 'center' }
      );

      // Instructions Divider & Guidance
      pdf.setDrawColor(210, 210, 210);
      const divY = backImg ? 180 : 115;
      pdf.line(20, divY, 190, divY);

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8.5);
      pdf.setTextColor(60, 60, 60);
      pdf.text("PRINTING & LAMINATING INSTRUCTIONS (মুদ্রণ ও লেমিনেটিং নির্দেশনা):", 105, divY + 7, { align: 'center' });

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7.5);
      pdf.setTextColor(100, 100, 100);
      pdf.text("1. Print this sheet on A4 paper or Photo Paper at 100% scale (Do not select 'Fit to page').", 105, divY + 13, { align: 'center' });
      pdf.text("2. Cut along the dotted border and laminate or place inside a standard PVC ID card badge holder.", 105, divY + 18, { align: 'center' });
      pdf.text("3. The QR code on the card can be scanned by any smartphone camera for live DGHS registry verification.", 105, divY + 23, { align: 'center' });

      pdf.save(`${idCard.idNumber}-Official-ID-Card.pdf`);
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
      {/* 3D Flip Card Container (Screen View Only) */}
      <div className="perspective-1000 w-full max-w-[430px] screen-only-card">
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

      {/* ============================================================== */}
      {/* DEDICATED PRINT SHEET (Visible ONLY when printing / window.print) */}
      {/* Physical dimensions: ISO/IEC 7810 ID-1 standard (85.6 mm × 54.0 mm) */}
      {/* ============================================================== */}
      <div id="printable-id-card-sheet" className="hidden print:flex flex-col items-center">
        {/* Print Sheet Header */}
        <div className="text-center mb-4 pb-2 border-b-2 border-gray-400 w-full max-w-[190mm]">
          <h2 className="text-[11px] font-black text-gray-800 tracking-wider uppercase font-serif">
            People's Republic of Bangladesh • Directorate General of Health Services
          </h2>
          <h1 className="text-base font-black text-[#8B1028] tracking-widest uppercase mt-0.5">
            National Blood Connection • Official Voluntary Donor Badge
          </h1>
          <p className="text-[9px] text-gray-600 mt-0.5 font-mono">
            Standard PVC Card Format (CR80: 85.6 mm × 54.0 mm) • Verified National Repository
          </p>
        </div>

        {/* Side-by-Side Front and Back Cards with Cut Borders */}
        <div className="flex flex-row items-center justify-center gap-8 my-2">
          {/* ================= FRONT SIDE (PRINT) ================= */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold text-gray-600 uppercase mb-1 flex items-center gap-1 font-mono">
              <span>✂ Card Front (কার্ড সম্মুখভাগ)</span>
            </span>
            <div
              className="w-[85.6mm] h-[54.0mm] p-[1mm] rounded-[3mm] border border-dashed border-gray-400 bg-white flex items-center justify-center shadow-sm"
              style={{
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact',
              }}
            >
              <div
                className="w-full h-full rounded-[2.5mm] p-2 flex flex-col justify-between relative overflow-hidden border border-[#D4AF37]"
                style={{
                  background: 'linear-gradient(135deg, #4A0D1C 0%, #2A050E 100%)',
                  color: '#FFFFFF',
                  WebkitPrintColorAdjust: 'exact',
                  printColorAdjust: 'exact',
                }}
              >
                {/* Watermark Logo */}
                <img
                  src="/assets/images/blood-connection-logo-final.png"
                  alt=""
                  className="absolute right-[-4mm] top-[-4mm] w-[32mm] h-[32mm] opacity-15 pointer-events-none object-contain"
                />

                {/* Front Top Header */}
                <div className="flex items-center justify-between border-b border-[#D4AF37]/40 pb-1 z-10">
                  <div className="flex items-center gap-1.5">
                    <img
                      src="/assets/images/blood-connection-logo-final.png"
                      alt="Logo"
                      className="w-6 h-6 object-contain"
                    />
                    <div>
                      <h4 className="font-serif font-black text-[10px] tracking-wider text-[#D4AF37] leading-none">
                        BLOOD CONNECTION
                      </h4>
                      <p className="text-[6.5px] uppercase tracking-widest text-[#F8F1E5]/80 mt-0.5">
                        National Blood Ecosystem Bangladesh
                      </p>
                    </div>
                  </div>
                  <span className="text-[7.5px] uppercase px-1.5 py-0.5 rounded-full bg-emerald-600 text-white font-bold tracking-wide">
                    {idCard.status}
                  </span>
                </div>

                {/* Front Middle Body */}
                <div className="flex items-center gap-2.5 my-auto z-10">
                  <div className="relative flex-shrink-0">
                    <img
                      src={idCard.avatarUrl}
                      alt={idCard.fullName}
                      className="w-[16mm] h-[16mm] rounded-lg object-cover border border-[#D4AF37]"
                    />
                    {idCard.bloodGroup && (
                      <div className="absolute -bottom-1 -right-1 bg-[#8B1028] border border-[#D4AF37] text-white font-black text-[9px] px-1 rounded">
                        {idCard.bloodGroup}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-black text-[12px] text-white uppercase truncate leading-tight">
                      {idCard.fullName}
                    </h3>
                    <div className="mt-0.5">
                      <span className="text-[7.5px] uppercase px-1.5 py-0.5 rounded-full bg-[#8B1028] text-[#D4AF37] font-bold border border-[#D4AF37]/50">
                        {idCard.role.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[8px] text-[#D4AF37] font-mono font-bold mt-1">
                      ID: <span className="text-white">{idCard.idNumber}</span>
                    </p>
                    {(idCard.assignedDistrict || idCard.organizationName) && (
                      <p className="text-[7.5px] text-[#F8F1E5]/80 truncate mt-0.5">
                        {idCard.organizationName || `${idCard.assignedUpazila ? idCard.assignedUpazila + ', ' : ''}${idCard.assignedDistrict}`}
                      </p>
                    )}
                  </div>

                  {/* High Contrast Scannable Print QR Code */}
                  <div className="flex-shrink-0 p-1 bg-white rounded-md border border-[#D4AF37]">
                    <QRCodeSVG
                      value={verificationUrl}
                      size={48}
                      level="M"
                      includeMargin={false}
                    />
                  </div>
                </div>

                {/* Front Footer */}
                <div className="flex items-center justify-between border-t border-[#D4AF37]/40 pt-0.5 text-[7px] text-[#F8F1E5]/80 z-10 font-mono">
                  <div>
                    <span className="text-[#D4AF37]">ISSUED: </span>
                    <span className="text-white">{idCard.issueDate}</span>
                  </div>
                  {idCard.expiryDate && (
                    <div>
                      <span className="text-[#D4AF37]">EXPIRES: </span>
                      <span className="text-white">{idCard.expiryDate}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-0.5 text-[#D4AF37] font-bold">
                    <Award className="w-2.5 h-2.5 text-[#D4AF37]" />
                    <span>DGHS COMPLIANT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= BACK SIDE (PRINT) ================= */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold text-gray-600 uppercase mb-1 flex items-center gap-1 font-mono">
              <span>✂ Card Back (কার্ড বিপরীতভাগ)</span>
            </span>
            <div
              className="w-[85.6mm] h-[54.0mm] p-[1mm] rounded-[3mm] border border-dashed border-gray-400 bg-white flex items-center justify-center shadow-sm"
              style={{
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact',
              }}
            >
              <div
                className="w-full h-full rounded-[2.5mm] p-2 flex flex-col justify-between relative overflow-hidden border border-[#D4AF37]"
                style={{
                  background: 'linear-gradient(135deg, #3A0713 0%, #1A0207 100%)',
                  color: '#FFFFFF',
                  WebkitPrintColorAdjust: 'exact',
                  printColorAdjust: 'exact',
                }}
              >
                {/* Back Top */}
                <div className="border-b border-[#D4AF37]/40 pb-1 text-center">
                  <h4 className="font-serif font-black text-[9px] text-[#D4AF37] tracking-wider uppercase">
                    Official National Voluntary Donor Identity
                  </h4>
                  <p className="text-[6.5px] text-[#F8F1E5]/80 mt-0.5">
                    Government of the People's Republic of Bangladesh • DGHS Aligned
                  </p>
                </div>

                {/* Back Body Terms */}
                <div className="space-y-1 text-[7.5px] text-[#F8F1E5]/90 my-auto py-0.5">
                  <div className="flex justify-between border-b border-[#D4AF37]/20 pb-0.5 font-mono">
                    <span className="text-[#D4AF37]">Verification Token:</span>
                    <span className="text-white font-bold">{idCard.verificationToken}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#D4AF37]/20 pb-0.5">
                    <span className="text-[#D4AF37]">National Health Helpline:</span>
                    <span className="text-white font-bold">16263 / 999</span>
                  </div>
                  <div className="flex justify-between border-b border-[#D4AF37]/20 pb-0.5">
                    <span className="text-[#D4AF37]">3-Month Safety Cooldown:</span>
                    <span className="text-emerald-300 font-bold">Strictly Enforced</span>
                  </div>
                  <p className="text-[6.5px] text-[#F8F1E5]/70 leading-tight pt-0.5">
                    * If found, please return to the nearest Upazila Health Complex, District Sadar Hospital, or Red Crescent blood center.
                  </p>
                </div>

                {/* Back Footer */}
                <div className="border-t border-[#D4AF37]/40 pt-1 flex items-center justify-between text-[7px] text-[#D4AF37] font-mono">
                  <span>bloodconnection.org.bd</span>
                  <span>Scan QR code to verify live status</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Print Guidelines */}
        <div className="text-center mt-6 pt-3 border-t border-gray-400 w-full max-w-[190mm] text-[8.5px] text-gray-600 font-mono">
          <p className="font-bold text-gray-800">
            ✂ CUTTING & LAMINATING INSTRUCTIONS (মুদ্রণ ও লেমিনেটিং নির্দেশনা):
          </p>
          <p className="mt-0.5">
            1. Print at 100% scale (Do not choose 'Fit to page'). • 2. Cut along the dotted line guidelines. • 3. Fold back-to-back or place in standard PVC badge pouch.
          </p>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2D FLAT EXPORT CONTAINERS (Used exclusively by html2canvas)   */}
      {/* Zero 3D transforms, exact pixel dimensions, pixel-perfect PDF  */}
      {/* ============================================================== */}
      <div
        style={{
          position: 'fixed',
          left: '-9999px',
          top: '0',
          zIndex: -100,
          pointerEvents: 'none',
        }}
      >
        {/* FLAT FRONT CARD (600px x 380px) */}
        <div
          ref={exportCardRef}
          style={{
            width: '600px',
            height: '380px',
            background: 'linear-gradient(135deg, #4A0D1C 0%, #2A050E 100%)',
            border: '3px solid #D4AF37',
            borderRadius: '16px',
            padding: '20px',
            color: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            fontFamily: "'Inter', sans-serif",
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(212, 175, 55, 0.4)',
              paddingBottom: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src="/assets/images/blood-connection-logo-final.png"
                alt="Logo"
                style={{ width: '42px', height: '42px', objectFit: 'contain' }}
              />
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 900,
                    fontSize: '16px',
                    letterSpacing: '1px',
                    color: '#D4AF37',
                    lineHeight: '1.2',
                  }}
                >
                  BLOOD CONNECTION
                </div>
                <div
                  style={{
                    fontSize: '9px',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: 'rgba(248, 241, 229, 0.8)',
                  }}
                >
                  National Blood Ecosystem Bangladesh
                </div>
              </div>
            </div>
            <div
              style={{
                background: '#10B981',
                color: '#FFFFFF',
                fontSize: '10px',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '12px',
                letterSpacing: '0.5px',
              }}
            >
              {idCard.status}
            </div>
          </div>

          {/* Middle Body */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              margin: 'auto 0',
            }}
          >
            {/* Avatar & Blood Group */}
            <div
              style={{
                position: 'relative',
                flexShrink: 0,
                width: '100px',
                height: '100px',
              }}
            >
              <img
                src={idCard.avatarUrl}
                alt={idCard.fullName}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  border: '2px solid #D4AF37',
                }}
              />
              {idCard.bloodGroup && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    right: '-4px',
                    background: '#8B1028',
                    border: '2px solid #D4AF37',
                    color: '#FFFFFF',
                    fontWeight: 900,
                    fontSize: '13px',
                    padding: '2px 8px',
                    borderRadius: '6px',
                  }}
                >
                  {idCard.bloodGroup}
                </div>
              )}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 900,
                  fontSize: '20px',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  lineHeight: '1.2',
                }}
              >
                {idCard.fullName}
              </div>
              <div style={{ marginTop: '4px' }}>
                <span
                  style={{
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    background: '#8B1028',
                    color: '#D4AF37',
                    fontWeight: 800,
                    border: '1px solid rgba(212, 175, 55, 0.5)',
                  }}
                >
                  {idCard.role.replace('_', ' ')}
                </span>
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#D4AF37',
                  fontFamily: 'monospace',
                  fontWeight: 800,
                  marginTop: '8px',
                }}
              >
                ID: <span style={{ color: '#FFFFFF' }}>{idCard.idNumber}</span>
              </div>
              {(idCard.assignedDistrict || idCard.organizationName) && (
                <div
                  style={{
                    fontSize: '11px',
                    color: 'rgba(248, 241, 229, 0.85)',
                    marginTop: '2px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {idCard.organizationName ||
                    `${idCard.assignedUpazila ? idCard.assignedUpazila + ', ' : ''}${idCard.assignedDistrict}`}
                </div>
              )}
            </div>

            {/* Scannable High-Contrast QR Code */}
            <div
              style={{
                flexShrink: 0,
                padding: '6px',
                background: '#FFFFFF',
                borderRadius: '10px',
                border: '2px solid #D4AF37',
              }}
            >
              <QRCodeSVG
                value={verificationUrl}
                size={80}
                level="M"
                includeMargin={false}
              />
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(212, 175, 55, 0.4)',
              paddingTop: '8px',
              fontSize: '10px',
              color: 'rgba(248, 241, 229, 0.8)',
              fontFamily: 'monospace',
            }}
          >
            <div>
              <span style={{ color: '#D4AF37' }}>ISSUED: </span>
              <span style={{ color: '#FFFFFF' }}>{idCard.issueDate}</span>
            </div>
            {idCard.expiryDate && (
              <div>
                <span style={{ color: '#D4AF37' }}>EXPIRES: </span>
                <span style={{ color: '#FFFFFF' }}>{idCard.expiryDate}</span>
              </div>
            )}
            <div style={{ color: '#D4AF37', fontWeight: 800, letterSpacing: '0.5px' }}>
              DGHS COMPLIANT
            </div>
          </div>
        </div>

        {/* FLAT BACK CARD (600px x 380px) */}
        <div
          ref={exportBackRef}
          style={{
            width: '600px',
            height: '380px',
            background: 'linear-gradient(135deg, #3A0713 0%, #1A0207 100%)',
            border: '3px solid #D4AF37',
            borderRadius: '16px',
            padding: '20px',
            color: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            fontFamily: "'Inter', sans-serif",
            marginTop: '20px',
          }}
        >
          {/* Back Top */}
          <div
            style={{
              borderBottom: '1px solid rgba(212, 175, 55, 0.4)',
              paddingBottom: '8px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 900,
                fontSize: '13px',
                color: '#D4AF37',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Official National Voluntary Donor Identity
            </div>
            <div
              style={{
                fontSize: '9px',
                color: 'rgba(248, 241, 229, 0.8)',
                marginTop: '2px',
              }}
            >
              Government of the People's Republic of Bangladesh • DGHS Aligned
            </div>
          </div>

          {/* Back Body Terms */}
          <div
            style={{
              margin: 'auto 0',
              fontSize: '11px',
              color: 'rgba(248, 241, 229, 0.9)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                paddingBottom: '4px',
                fontFamily: 'monospace',
              }}
            >
              <span style={{ color: '#D4AF37' }}>Verification Token:</span>
              <span style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                {idCard.verificationToken}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                paddingBottom: '4px',
              }}
            >
              <span style={{ color: '#D4AF37' }}>National Health Helpline:</span>
              <span style={{ color: '#FFFFFF', fontWeight: 'bold' }}>16263 / 999</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                paddingBottom: '4px',
              }}
            >
              <span style={{ color: '#D4AF37' }}>3-Month Safety Cooldown:</span>
              <span style={{ color: '#6EE7B7', fontWeight: 'bold' }}>Strictly Enforced</span>
            </div>
            <div
              style={{
                fontSize: '9px',
                color: 'rgba(248, 241, 229, 0.7)',
                lineHeight: '1.3',
                marginTop: '4px',
              }}
            >
              * If found, please return to the nearest Upazila Health Complex, District Sadar
              Hospital, or Red Crescent blood center.
            </div>
          </div>

          {/* Back Footer */}
          <div
            style={{
              borderTop: '1px solid rgba(212, 175, 55, 0.4)',
              paddingTop: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '10px',
              color: '#D4AF37',
              fontFamily: 'monospace',
            }}
          >
            <span>bloodconnection.org.bd</span>
            <span>Scan QR code on front to verify live status</span>
          </div>
        </div>
      </div>
    </div>
  );
};
