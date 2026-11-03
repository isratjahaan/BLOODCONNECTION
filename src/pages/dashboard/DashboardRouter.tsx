import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { SuperAdminDashboard } from './SuperAdminDashboard';
import { CoordinatorDashboard } from './CoordinatorDashboard';
import { OrganizationAdminDashboard } from './OrganizationAdminDashboard';
import { VolunteerDashboard } from './VolunteerDashboard';
import { DonorDashboard } from './DonorDashboard';
import { VisitorDashboard } from './VisitorDashboard';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const DashboardRouter: React.FC = () => {
  const { currentRole, switchRole, currentUser } = useAuth();

  const allRoles: { role: UserRole; label: string; icon: string }[] = [
    { role: 'SUPER_ADMIN', label: '1. Super Admin', icon: '👑' },
    { role: 'ADMIN', label: '2. Admin', icon: '⚡' },
    { role: 'DIVISION_ADMIN', label: '3. Division Admin', icon: '🏛️' },
    { role: 'DISTRICT_COORDINATOR', label: '4. District Coordinator', icon: '📍' },
    { role: 'UPAZILA_COORDINATOR', label: '5. Upazila Coordinator', icon: '🏢' },
    { role: 'ORGANIZATION_ADMIN', label: '6. Org Admin', icon: '🏥' },
    { role: 'VOLUNTEER', label: '7. Volunteer', icon: '🤝' },
    { role: 'DONOR', label: '8. Donor', icon: '🩸' },
    { role: 'VISITOR', label: '9. Visitor', icon: '🌐' },
  ];

  const renderDashboardContent = () => {
    switch (currentRole) {
      case 'SUPER_ADMIN':
      case 'ADMIN':
        return <SuperAdminDashboard />;
      case 'DIVISION_ADMIN':
      case 'DISTRICT_COORDINATOR':
      case 'UPAZILA_COORDINATOR':
        return <CoordinatorDashboard />;
      case 'ORGANIZATION_ADMIN':
        return <OrganizationAdminDashboard />;
      case 'VOLUNTEER':
        return <VolunteerDashboard />;
      case 'DONOR':
        return <DonorDashboard />;
      case 'VISITOR':
      default:
        return <VisitorDashboard />;
    }
  };

  return (
    <div className="bg-ivory min-h-screen py-8 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Interactive Evaluator Role Switcher Strip */}
        <div className="bg-white rounded-2xl border-2 border-gold/40 p-3 sm:p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-burgundy">
            <Sparkles className="w-4 h-4 text-gold-metallic" />
            <span>Role Switcher (All 9 Roles):</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
            {allRoles.map((r) => (
              <button
                key={r.role}
                onClick={() => switchRole(r.role)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                  currentRole === r.role
                    ? 'bg-crimson text-white shadow-sm ring-2 ring-gold'
                    : 'bg-ivory-light text-charcoal/80 hover:bg-gold-light/40 border border-gold/30'
                }`}
              >
                <span>{r.icon}</span> <span className="ml-0.5">{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Rendered Role-Specific Dashboard View */}
        {renderDashboardContent()}
      </div>
    </div>
  );
};
