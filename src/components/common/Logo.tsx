import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'full' | 'icon' | 'dark-bg' | 'light-bg' | 'compact';
  className?: string;
  showTagline?: boolean;
  linkToHome?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  className = '',
  showTagline = true,
  linkToHome = true,
}) => {
  const logoContent = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official 3D Gold Embossed Logo */}
      <img
        src="/assets/images/blood-connection-logo-gold.jpg"
        alt="BLOOD CONNECTION"
        className={`object-contain rounded-xl shadow-md border border-gold/50 transition-transform duration-200 hover:scale-105 ${
          variant === 'icon'
            ? 'h-10 w-10 md:h-12 md:w-12 object-cover'
            : variant === 'compact'
            ? 'h-11 sm:h-12 w-auto'
            : 'h-14 sm:h-16 w-auto'
        }`}
      />
      {variant === 'full' && (
        <div className="hidden sm:flex flex-col justify-center">
          <div className="flex items-center gap-1.5 leading-tight">
            <span className="font-serif font-black tracking-wider text-xl sm:text-2xl text-gold-metallic drop-shadow-md">
              BLOOD
            </span>
            <span className="font-serif font-extrabold tracking-wide text-xl sm:text-2xl text-white drop-shadow-md">
              CONNECTION
            </span>
          </div>
          {showTagline && (
            <span className="text-[10px] sm:text-xs font-semibold text-gold-champagne tracking-widest uppercase mt-0.5">
              Connecting Blood Donors • Saving Lives
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link
        to="/"
        className="inline-flex items-center focus:outline-none focus:ring-2 focus:ring-gold rounded-xl"
        title="BLOOD CONNECTION — Connecting Blood Donors. Saving Lives."
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};
