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
  linkToHome = true,
}) => {
  const logoContent = (
    <div className={`flex items-center select-none ${className}`}>
      {/* Official Transparent 3D Gold Logo */}
      <img
        src="/assets/images/blood-connection-logo-final.png"
        alt="BLOOD CONNECTION — Connecting Blood Donors. Saving Lives."
        className={`object-contain transition-transform duration-200 hover:scale-105 filter drop-shadow-[0_2px_10px_rgba(212,175,55,0.35)] ${
          variant === 'icon'
            ? 'h-10 w-10 md:h-12 md:w-12 object-contain'
            : variant === 'compact'
            ? 'h-11 sm:h-12 w-auto'
            : 'h-14 sm:h-16 md:h-18 w-auto max-w-[280px]'
        }`}
      />
    </div>
  );

  if (linkToHome) {
    return (
      <Link
        to="/"
        className="inline-flex items-center focus:outline-none focus:ring-2 focus:ring-gold rounded-xl py-1"
        title="BLOOD CONNECTION — Connecting Blood Donors. Saving Lives."
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};
