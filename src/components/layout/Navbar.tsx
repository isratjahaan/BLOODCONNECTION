import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types';
import {
  Menu,
  X,
  ChevronDown,
  Bell,
  UserCheck,
  QrCode,
  ShieldAlert,
  Droplet,
  HeartHandshake,
  LogOut,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, currentRole, switchRole, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [registerDropdownOpen, setRegisterDropdownOpen] = useState(false);
  const [findDropdownOpen, setFindDropdownOpen] = useState(false);
  const location = useLocation();

  const allRoles: { role: UserRole; label: string; icon: string }[] = [
    { role: 'SUPER_ADMIN', label: '1. Super Admin', icon: '👑' },
    { role: 'ADMIN', label: '2. Admin', icon: '⚡' },
    { role: 'DIVISION_ADMIN', label: '3. Division Admin', icon: '🏛️' },
    { role: 'DISTRICT_COORDINATOR', label: '4. District Coordinator', icon: '📍' },
    { role: 'UPAZILA_COORDINATOR', label: '5. Upazila Coordinator', icon: '🏢' },
    { role: 'ORGANIZATION_ADMIN', label: '6. Organization Admin', icon: '🏥' },
    { role: 'VOLUNTEER', label: '7. Volunteer', icon: '🤝' },
    { role: 'DONOR', label: '8. Donor', icon: '🩸' },
    { role: 'VISITOR', label: '9. Visitor / Public', icon: '🌐' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-burgundy border-b border-gold/30 shadow-royal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Logo variant="full" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              to="/"
              className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                isActive('/')
                  ? 'bg-gold text-burgundy shadow-gold-glow font-bold'
                  : 'text-ivory-light hover:text-gold hover:bg-burgundy-light/60'
              }`}
            >
              {t('navHome')}
            </Link>

            {/* Find Donor Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setFindDropdownOpen(!findDropdownOpen)}
                onMouseEnter={() => setFindDropdownOpen(true)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  isActive('/donors')
                    ? 'bg-gold text-burgundy font-bold'
                    : 'text-ivory-light hover:text-gold hover:bg-burgundy-light/60'
                }`}
              >
                <span>{t('navFindDonor')}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {findDropdownOpen && (
                <div
                  onMouseLeave={() => setFindDropdownOpen(false)}
                  className="absolute left-0 mt-1 w-56 bg-burgundy-dark border border-gold/40 rounded-xl shadow-royal-lg py-2 z-50 text-sm text-ivory-light"
                >
                  <Link
                    to="/donors"
                    onClick={() => setFindDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-crimson/50 hover:text-gold transition-colors"
                  >
                    <Droplet className="w-4 h-4 text-crimson-light" />
                    <span>Search All Donors</span>
                  </Link>
                  <Link
                    to="/donors?availability=AVAILABLE"
                    onClick={() => setFindDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-crimson/50 hover:text-gold transition-colors"
                  >
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <span>Available Donors (3-Month Rule)</span>
                  </Link>
                  <Link
                    to="/donors?emergency=true"
                    onClick={() => setFindDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-crimson/50 hover:text-gold transition-colors"
                  >
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span>Emergency On-Call Pool</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/blood-request"
              className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                isActive('/blood-request') || isActive('/requests')
                  ? 'bg-gold text-burgundy font-bold'
                  : 'text-ivory-light hover:text-gold hover:bg-burgundy-light/60'
              }`}
            >
              {t('navBloodRequest')}
            </Link>

            {/* Register Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setRegisterDropdownOpen(!registerDropdownOpen)}
                onMouseEnter={() => setRegisterDropdownOpen(true)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  isActive('/register')
                    ? 'bg-gold text-burgundy font-bold'
                    : 'text-ivory-light hover:text-gold hover:bg-burgundy-light/60'
                }`}
              >
                <span>{t('navRegister')}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {registerDropdownOpen && (
                <div
                  onMouseLeave={() => setRegisterDropdownOpen(false)}
                  className="absolute left-0 mt-1 w-56 bg-burgundy-dark border border-gold/40 rounded-xl shadow-royal-lg py-2 z-50 text-sm text-ivory-light"
                >
                  <Link
                    to="/register"
                    onClick={() => setRegisterDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-crimson/50 hover:text-gold transition-colors"
                  >
                    <Droplet className="w-4 h-4 text-gold" />
                    <span>Register as Donor</span>
                  </Link>
                  <Link
                    to="/register?role=volunteer"
                    onClick={() => setRegisterDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-crimson/50 hover:text-gold transition-colors"
                  >
                    <HeartHandshake className="w-4 h-4 text-gold" />
                    <span>Join as Volunteer</span>
                  </Link>
                  <Link
                    to="/organizations"
                    onClick={() => setRegisterDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-crimson/50 hover:text-gold transition-colors"
                  >
                    <UserCheck className="w-4 h-4 text-gold" />
                    <span>Partner Organizations</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/dashboard"
              className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                isActive('/dashboard')
                  ? 'bg-gold text-burgundy font-bold'
                  : 'text-ivory-light hover:text-gold hover:bg-burgundy-light/60'
              }`}
            >
              {t('navDashboard')}
            </Link>

            <Link
              to="/campaigns"
              className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                isActive('/campaigns')
                  ? 'bg-gold text-burgundy font-bold'
                  : 'text-ivory-light hover:text-gold hover:bg-burgundy-light/60'
              }`}
            >
              {t('navCampaigns')}
            </Link>

            <Link
              to="/about"
              className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                isActive('/about')
                  ? 'bg-gold text-burgundy font-bold'
                  : 'text-ivory-light hover:text-gold hover:bg-burgundy-light/60'
              }`}
            >
              {t('navAbout')}
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                isActive('/contact')
                  ? 'bg-gold text-burgundy font-bold'
                  : 'text-ivory-light hover:text-gold hover:bg-burgundy-light/60'
              }`}
            >
              {t('navContact')}
            </Link>
          </nav>

          {/* Right Header Utilities: Role Switcher, Language Toggle, Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Quick 9-Role Evaluation Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1 bg-burgundy-dark/90 hover:bg-burgundy-light border border-gold/50 rounded-full text-xs font-semibold text-gold transition-all shadow-sm"
                title="Switch active role to test all 9 roles"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-metallic" />
                <span className="truncate max-w-[110px]">{currentRole.replace('_', ' ')}</span>
                <ChevronDown className="w-3 h-3 text-gold/80" />
              </button>

              {roleDropdownOpen && (
                <div
                  onMouseLeave={() => setRoleDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-64 bg-burgundy-dark border border-gold/50 rounded-xl shadow-royal-lg py-2 z-50"
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold text-gold-champagne tracking-wider uppercase border-b border-gold/20">
                    Switch Active Role (9 Roles)
                  </div>
                  {allRoles.map((r) => (
                    <button
                      key={r.role}
                      onClick={() => {
                        switchRole(r.role);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-left transition-colors ${
                        currentRole === r.role
                          ? 'bg-crimson text-white font-bold'
                          : 'text-ivory hover:bg-burgundy-light hover:text-gold'
                      }`}
                    >
                      <span>
                        <span className="mr-2">{r.icon}</span>
                        {r.label}
                      </span>
                      {currentRole === r.role && <span className="text-[10px] text-gold">ACTIVE</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="px-2.5 py-1 rounded-md text-xs font-bold border border-gold/40 text-gold-light hover:bg-gold hover:text-burgundy transition-colors"
            >
              {language === 'en' ? 'বাংলা' : 'EN'}
            </button>

            {/* Authenticated State vs Visitor Actions */}
            {currentUser && currentRole !== 'VISITOR' ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 p-1 pl-2 pr-3 bg-burgundy-dark/80 hover:bg-burgundy-light border border-gold/40 rounded-full text-xs text-ivory font-medium transition-colors"
                >
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.fullName}
                    className="w-6 h-6 rounded-full object-cover border border-gold"
                  />
                  <span className="truncate max-w-[90px]">{currentUser.fullName.split(' ')[0]}</span>
                </Link>

                <button
                  onClick={logout}
                  className="p-1.5 text-gold-champagne hover:text-white hover:bg-crimson/40 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-1.5 rounded-full text-sm font-bold bg-gold hover:bg-gold-light text-burgundy transition-all shadow-gold-glow"
                >
                  {t('navLogin')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1.5 rounded-full text-sm font-bold border border-gold text-gold hover:bg-crimson hover:text-white transition-all"
                >
                  {t('navRegister')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="px-2 py-0.5 rounded text-xs font-bold border border-gold/40 text-gold"
            >
              {language === 'en' ? 'বাংলা' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gold hover:text-white hover:bg-burgundy-light transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-burgundy-dark border-t border-gold/20 px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-gold/20">
            <span className="text-xs font-semibold text-gold-champagne">Role: {currentRole}</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => switchRole('DONOR')}
                className="px-2 py-0.5 text-[11px] rounded bg-burgundy border border-gold/40 text-gold"
              >
                Donor
              </button>
              <button
                onClick={() => switchRole('SUPER_ADMIN')}
                className="px-2 py-0.5 text-[11px] rounded bg-burgundy border border-gold/40 text-gold"
              >
                Admin
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-ivory">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-burgundy hover:bg-crimson font-medium"
            >
              {t('navHome')}
            </Link>
            <Link
              to="/donors"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-burgundy hover:bg-crimson font-medium"
            >
              {t('navFindDonor')}
            </Link>
            <Link
              to="/blood-request"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-burgundy hover:bg-crimson font-medium"
            >
              {t('navBloodRequest')}
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-burgundy hover:bg-crimson font-medium"
            >
              {t('navDashboard')}
            </Link>
            <Link
              to="/campaigns"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-burgundy hover:bg-crimson font-medium"
            >
              {t('navCampaigns')}
            </Link>
            <Link
              to="/organizations"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-burgundy hover:bg-crimson font-medium"
            >
              {t('navOrganizations')}
            </Link>
          </div>

          <div className="pt-2 flex gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 bg-gold text-burgundy font-bold rounded-lg text-sm"
            >
              {t('navLogin')}
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 border border-gold text-gold font-bold rounded-lg text-sm"
            >
              {t('navRegister')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
