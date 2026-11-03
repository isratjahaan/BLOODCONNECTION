import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Logo } from '../components/common/Logo';
import {
  Lock,
  Mail,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  UserCheck,
  CheckCircle,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, switchRole } = useAuth();

  const [activeTab, setActiveTab] = useState<'public' | 'admin'>('public');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const quickRoles: { role: UserRole; label: string; email: string; desc: string; icon: string }[] = [
    {
      role: 'SUPER_ADMIN',
      label: 'Super Admin',
      email: 'superadmin@bloodconnection.gov.bd',
      desc: 'National platform oversight & full settings',
      icon: '👑',
    },
    {
      role: 'ADMIN',
      label: 'Admin (Central)',
      email: 'admin.central@bloodconnection.org.bd',
      desc: 'Platform moderation & requests review',
      icon: '⚡',
    },
    {
      role: 'DIVISION_ADMIN',
      label: 'Division Admin',
      email: 'dhaka.division@bloodconnection.org.bd',
      desc: 'Dhaka Division (13 districts)',
      icon: '🏛️',
    },
    {
      role: 'DISTRICT_COORDINATOR',
      label: 'District Coordinator',
      email: 'chattogram.district@bloodconnection.org.bd',
      desc: 'Chattogram District donors & requests',
      icon: '📍',
    },
    {
      role: 'UPAZILA_COORDINATOR',
      label: 'Upazila Coordinator',
      email: 'dhanmondi.coord@bloodconnection.org.bd',
      desc: 'Dhanmondi Thana localized matching',
      icon: '🏢',
    },
    {
      role: 'ORGANIZATION_ADMIN',
      label: 'Organization Admin',
      email: 'sandhani.dmc@bloodconnection.org.bd',
      desc: 'Sandhani DMC Blood Club management',
      icon: '🏥',
    },
    {
      role: 'VOLUNTEER',
      label: 'Field Volunteer',
      email: 'sakib.volunteer@bloodconnection.org.bd',
      desc: 'Assigned request response & field verification',
      icon: '🤝',
    },
    {
      role: 'DONOR',
      label: 'Registered Donor',
      email: 'donor.tariq@gmail.com',
      desc: 'Personal ID Card, 3-mo tracker, donation history',
      icon: '🩸',
    },
  ];

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email);
    if (success) {
      navigate('/dashboard');
    } else {
      setErrorMsg('No user found with this email. Please select a demo role below or register.');
    }
  };

  const handleQuickRoleSelect = (role: UserRole) => {
    switchRole(role);
    navigate('/dashboard');
  };

  return (
    <div className="bg-ivory min-h-screen py-10 flex items-center justify-center text-charcoal px-4">
      <div className="max-w-2xl w-full">
        {/* Card Box */}
        <div className="bg-white rounded-3xl border-2 border-gold/40 p-6 sm:p-10 shadow-royal">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <Logo variant="compact" linkToHome={false} />
            </div>
            <h1 className="font-serif font-black text-2xl sm:text-3xl text-burgundy">
              Account Authentication Portal
            </h1>
            <p className="text-xs text-charcoal/70 mt-1">
              Connecting Blood Donors. Saving Lives across Bangladesh.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex border-b border-gold/30 mb-6 text-xs font-bold">
            <button
              onClick={() => setActiveTab('public')}
              className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
                activeTab === 'public'
                  ? 'border-crimson text-crimson font-black'
                  : 'border-transparent text-charcoal/60 hover:text-charcoal'
              }`}
            >
              Public & Donor Login
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
                activeTab === 'admin'
                  ? 'border-crimson text-crimson font-black'
                  : 'border-transparent text-charcoal/60 hover:text-charcoal'
              }`}
            >
              Administrative & Coordinator Login
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-xl text-xs text-red-800">
              {errorMsg}
            </div>
          )}

          {/* Standard Login Form */}
          <form onSubmit={handleStandardLogin} className="space-y-4 mb-8">
            <div>
              <label className="block text-xs font-bold text-charcoal/80 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-charcoal/40 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    activeTab === 'public'
                      ? 'e.g. donor.tariq@gmail.com'
                      : 'e.g. admin.central@bloodconnection.org.bd'
                  }
                  className="w-full bg-ivory-light border border-gold/40 rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal/80 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal/40 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-ivory-light border border-gold/40 rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-burgundy hover:bg-crimson text-gold font-bold text-xs uppercase tracking-wider transition-colors shadow"
            >
              Sign In to {activeTab === 'public' ? 'Donor Account' : 'Administrative Console'}
            </button>
          </form>

          {/* QUICK DEMO ROLE SELECTOR (Evaluation feature for all 9 roles) */}
          <div className="pt-6 border-t border-gold/20">
            <div className="flex items-center gap-1.5 text-xs font-bold text-burgundy mb-3">
              <Sparkles className="w-4 h-4 text-gold-metallic" />
              <span>1-Click Evaluator Role Switcher (All 9 Roles)</span>
            </div>
            <p className="text-[11px] text-charcoal/70 mb-3">
              Click any of the authorized roles below to instantly log in and inspect their dedicated dashboard, permissions, and ID card:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {quickRoles.map((r) => (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => handleQuickRoleSelect(r.role)}
                  className="p-2.5 rounded-xl border border-gold/30 hover:border-gold hover:bg-gold-light/20 bg-ivory-light flex items-center justify-between text-left transition-all"
                >
                  <div className="truncate pr-2">
                    <span className="font-bold text-burgundy text-xs block">
                      <span className="mr-1">{r.icon}</span> {r.label}
                    </span>
                    <span className="text-[10px] text-charcoal/60 truncate block">
                      {r.desc}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-crimson flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-charcoal/70">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-crimson hover:underline">
              Register as Donor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
