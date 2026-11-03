import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { useLanguage } from '../../context/LanguageContext';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-burgundy text-ivory border-t-2 border-gold/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex-shrink-0">
            <Logo variant="full" />
          </div>

          {/* Quick Legal & Info Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs md:text-sm text-ivory-light">
            <Link to="/privacy" className="hover:text-gold transition-colors">
              {t('footerPrivacy')}
            </Link>
            <span className="text-gold/40">|</span>
            <Link to="/terms" className="hover:text-gold transition-colors">
              {t('footerTerms')}
            </Link>
            <span className="text-gold/40">|</span>
            <Link to="/help" className="hover:text-gold transition-colors">
              {t('footerFaq')}
            </Link>
            <span className="text-gold/40">|</span>
            <Link to="/contact" className="hover:text-gold transition-colors">
              {t('footerContact')}
            </Link>
          </nav>

          {/* Social Icons & Healthier Bangladesh Badge */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Social Media Icons (SVG) */}
            <div className="flex items-center space-x-2 text-white">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-burgundy-dark flex items-center justify-center border border-gold/40 hover:border-gold hover:bg-crimson transition-all"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-burgundy-dark flex items-center justify-center border border-gold/40 hover:border-gold hover:bg-crimson transition-all"
                aria-label="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136c-1.871-.5-9.376-.5-9.376-.5s-7.504 0-9.377.5a3.017 3.017 0 0 0-2.122 2.136c-.5 1.871-.5 5.814-.5 5.814s0 3.943.5 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.5 9.376.5 9.376.5s7.505 0 9.377-.5a3.015 3.015 0 0 0 2.122-2.136c.5-1.871.5-5.814.5-5.814s0-3.943-.5-5.814zm-14.498 9.814v-8l6.928 4-6.928 4z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-burgundy-dark flex items-center justify-center border border-gold/40 hover:border-gold hover:bg-crimson transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-burgundy-dark flex items-center justify-center border border-gold/40 hover:border-gold hover:bg-crimson transition-all"
                aria-label="X (Twitter)"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-burgundy-dark flex items-center justify-center border border-gold/40 hover:border-gold hover:bg-crimson transition-all"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>

            {/* Reference Badge: Together for a Healthier Bangladesh */}
            <div className="px-4 py-1.5 rounded-full bg-gold-metallic-gradient text-burgundy-dark font-bold text-xs md:text-sm flex items-center gap-1.5 shadow-gold-glow">
              <span>Together for a Healthier Bangladesh</span>
              <Heart className="w-3.5 h-3.5 fill-crimson text-crimson" />
            </div>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="mt-8 pt-4 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between text-[11px] text-ivory/70">
          <p>
            © {new Date().getFullYear()} BLOOD CONNECTION. Bangladesh National Blood Donation & Management Ecosystem. All rights reserved.
          </p>
          <p className="mt-2 sm:mt-0 text-gold-champagne">
            Official Healthcare Technology Initiative • Directorate General of Health Services (DGHS) Aligned
          </p>
        </div>
      </div>
    </footer>
  );
};
