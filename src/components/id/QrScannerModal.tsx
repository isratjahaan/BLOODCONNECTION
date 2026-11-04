import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, Upload, X, Search, ShieldCheck, AlertCircle, RefreshCw, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrScannerModal: React.FC<QrScannerModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'camera' | 'upload' | 'manual'>('camera');
  const [manualId, setManualId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const qrRegionId = 'qr-reader-container';
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const navigate = useNavigate();

  const stopCameraSafely = async () => {
    if (html5QrCodeRef.current) {
      try {
        if (html5QrCodeRef.current.isScanning) {
          await html5QrCodeRef.current.stop();
        }
        html5QrCodeRef.current.clear();
      } catch (err) {
        // already stopped
      }
      html5QrCodeRef.current = null;
    }
    setCameraActive(false);
  };

  const handleScanSuccess = async (decodedText: string) => {
    await stopCameraSafely();
    onClose();
    if (decodedText.includes('/verify/')) {
      const pathWithParams = decodedText.substring(decodedText.indexOf('/verify/'));
      navigate(pathWithParams);
    } else {
      navigate(`/verify/${encodeURIComponent(decodedText.trim())}`);
    }
  };

  const startCamera = async () => {
    setErrorMsg('');
    try {
      await stopCameraSafely();
      const qrCode = new Html5Qrcode(qrRegionId);
      html5QrCodeRef.current = qrCode;

      await qrCode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 240, height: 240 },
        },
        (decodedText) => {
          handleScanSuccess(decodedText);
        },
        () => {
          // ignore scan frame errors
        }
      );
      setCameraActive(true);
    } catch (err: any) {
      setErrorMsg(
        err?.message ||
          'Camera access was denied or is not available on this device. Please select "Upload Image" or "Enter ID" below.'
      );
      setCameraActive(false);
    }
  };

  useEffect(() => {
    if (isOpen && activeTab === 'camera') {
      // Small timeout to allow container element to render
      const timer = setTimeout(() => {
        startCamera();
      }, 300);
      return () => {
        clearTimeout(timer);
        stopCameraSafely();
      };
    } else {
      stopCameraSafely();
    }
    return () => {
      stopCameraSafely();
    };
  }, [isOpen, activeTab]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg('');
    setIsProcessingFile(true);

    try {
      await stopCameraSafely();
      const qrCode = new Html5Qrcode('file-qr-hidden-container');
      const decodedText = await qrCode.scanFile(file, true);
      qrCode.clear();
      setIsProcessingFile(false);
      handleScanSuccess(decodedText);
    } catch (err: any) {
      setIsProcessingFile(false);
      setErrorMsg('No valid QR code detected in the selected image. Please make sure the QR code is clear and in focus.');
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualId.trim()) {
      setErrorMsg('Please enter an ID number or token.');
      return;
    }
    stopCameraSafely();
    onClose();
    navigate(`/verify/${encodeURIComponent(manualId.trim())}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full border-2 border-gold shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-burgundy text-white px-6 py-4 flex items-center justify-between border-b-2 border-gold">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gold/20 text-gold border border-gold/40">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-black text-lg text-gold">Official ID Card Scanner</h3>
              <p className="text-[11px] text-ivory/80">Scan QR Code or Verify ID Number</p>
            </div>
          </div>
          <button
            onClick={() => {
              stopCameraSafely();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/10 text-ivory/80 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-gold/20 bg-ivory">
          <button
            onClick={() => setActiveTab('camera')}
            className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'camera'
                ? 'bg-white text-burgundy border-b-2 border-burgundy shadow-sm'
                : 'text-charcoal/60 hover:text-burgundy'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Live Camera</span>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'upload'
                ? 'bg-white text-burgundy border-b-2 border-burgundy shadow-sm'
                : 'text-charcoal/60 hover:text-burgundy'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Image</span>
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'manual'
                ? 'bg-white text-burgundy border-b-2 border-burgundy shadow-sm'
                : 'text-charcoal/60 hover:text-burgundy'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Enter ID</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-xl text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* TAB 1: LIVE CAMERA */}
          {activeTab === 'camera' && (
            <div className="flex flex-col items-center">
              <div className="relative w-full aspect-square max-w-[280px] bg-charcoal rounded-2xl overflow-hidden border-2 border-gold/40 flex items-center justify-center shadow-inner">
                <div id={qrRegionId} className="w-full h-full" />
                {!cameraActive && !errorMsg && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-charcoal/90 text-white p-4 text-center">
                    <RefreshCw className="w-7 h-7 text-gold animate-spin mb-2" />
                    <p className="text-xs">Initializing camera feed...</p>
                  </div>
                )}
              </div>
              <p className="text-[11px] text-charcoal/70 text-center mt-3 max-w-xs">
                Hold the ID Card or QR Code steady in front of your camera to scan automatically.
              </p>
            </div>
          )}

          {/* TAB 2: UPLOAD IMAGE */}
          {activeTab === 'upload' && (
            <div className="flex flex-col items-center text-center">
              <div id="file-qr-hidden-container" className="hidden" />
              <label className="w-full aspect-[4/3] max-w-xs border-2 border-dashed border-gold/60 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gold/5 transition-all p-4 group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isProcessingFile}
                />
                <div className="w-14 h-14 rounded-full bg-gold/10 text-burgundy flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  {isProcessingFile ? (
                    <RefreshCw className="w-7 h-7 text-burgundy animate-spin" />
                  ) : (
                    <Upload className="w-7 h-7 text-burgundy" />
                  )}
                </div>
                <p className="font-bold text-sm text-burgundy">
                  {isProcessingFile ? 'Scanning Image...' : 'Click to Upload ID Card Image'}
                </p>
                <p className="text-[11px] text-charcoal/60 mt-1">Supports PNG, JPG, WEBP, Screenshots</p>
              </label>
            </div>
          )}

          {/* TAB 3: ENTER ID MANUALLY */}
          {activeTab === 'manual' && (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-burgundy uppercase tracking-wider mb-1.5">
                  Registry ID Number or Token
                </label>
                <input
                  type="text"
                  placeholder="e.g. BC-DON-2026-94650 or bc-token-..."
                  value={manualId}
                  onChange={(e) => setManualId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gold/40 focus:outline-none focus:ring-2 focus:ring-burgundy text-sm font-mono"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-burgundy hover:bg-crimson text-gold font-bold text-xs uppercase tracking-wider shadow-royal transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Verify Credential Now</span>
              </button>

              <div className="pt-2 border-t border-gold/20">
                <p className="text-[11px] text-charcoal/60 mb-2">Sample Quick Test IDs:</p>
                <div className="flex flex-wrap gap-1.5">
                  {['bc-token-donor1', 'bc-token-superadmin', 'bc-token-distcoord'].map((sample) => (
                    <button
                      key={sample}
                      type="button"
                      onClick={() => {
                        stopCameraSafely();
                        onClose();
                        navigate(`/verify/${sample}`);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-ivory hover:bg-gold/20 text-burgundy text-[10px] font-mono border border-gold/30"
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-ivory border-t border-gold/20 text-[11px] text-charcoal/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>DGHS Bangladesh Verification Standard</span>
          </div>
          <button
            onClick={() => {
              stopCameraSafely();
              onClose();
            }}
            className="text-burgundy font-bold hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
