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
  const logoImage = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official High-Resolution Logo from Reference */}
      <img
        src="/assets/images/blood-connection-logo.png"
        alt="BLOOD CONNECTION Logo"
        className={`object-contain transition-transform duration-200 hover:scale-105 ${
          variant === 'icon'
            ? 'h-10 w-10 md:h-12 md:w-12'
            : variant === 'compact'
            ? 'h-9 w-auto'
            : 'h-11 md:h-14 w-auto'
        }`}
      />
      {variant !== 'icon' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-serif font-extrabold tracking-wider text-xl md:text-2xl text-gold-metallic">
              BLOOD
            </span>
            <span className="font-serif font-bold tracking-wide text-xl md:text-2xl text-white">
              CONNECTION
            </span>
          </div>
          {showTagline && (
            <span className="text-[10px] md:text-xs font-medium text-gold-champagne tracking-widest uppercase mt-0.5">
              Connecting Blood Donors • Saving Lives
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link to="/" className="inline-flex focus:outline-none focus:ring-2 focus:ring-gold rounded-lg">
        {logoImage}
      </Link>
    );
  }

  return logoImage;
};
