import React, { useState } from 'react';
import { bloodConnectionStore } from '../../services/store';
import { BANGLADESH_DIVISIONS } from '../../data/bangladeshLocations';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  Users,
  Droplet,
  HeartHandshake,
  Building,
  ShieldCheck,
  Activity,
  Download,
  Settings,
  History,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

export const SuperAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'audit' | 'settings'>('analytics');

  const donors = bloodConnectionStore.getDonors();
  const requests = bloodConnectionStore.getRequests();
  const orgs = bloodConnectionStore.getOrganizations();
  const auditLogs = bloodConnectionStore.getAuditLogs();
  const profiles = bloodConnectionStore.getProfiles();

  const availableDonors = donors.filter((d) => d.availabilityStatus === 'AVAILABLE');
  const inCooldownDonors = donors.filter((d) => d.availabilityStatus === 'UNAVAILABLE_TEMPORARY');
  const fulfilledRequests = requests.filter((r) => r.status === 'FULFILLED');

  // Blood group breakdown data for Pie Chart
  const bloodGroupCounts: Record<string, number> = {
    'A+': 0, 'A-': 0, 'B+': 0, 'B-': 0, 'AB+': 0, 'AB-': 0, 'O+': 0, 'O-': 0,
  };
  donors.forEach((d) => {
    if (bloodGroupCounts[d.bloodGroup] !== undefined) {
      bloodGroupCounts[d.bloodGroup]++;
    }
  });

  const pieData = Object.entries(bloodGroupCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const PIE_COLORS = [
    '#8B1028', '#D4AF37', '#4A0D1C', '#C6A15B', '#E47183', '#A6841E', '#6E0A1E', '#242126'
  ];

  // Division breakdown data
  const divisionData = BANGLADESH_DIVISIONS.map((div) => {
    const count = donors.filter((d) => d.profile.divisionId === div.id).length;
    return {
      name: div.name,
      donors: count,
    };
  });

  // Export Analytics CSV
  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'ID,Full Name,Blood Group,District,Division,Availability,Donations\n' +
      donors
        .map(
          (d) =>
            `${d.id},"${d.profile.fullName}",${d.bloodGroup},${d.profile.districtId},${d.profile.divisionId},${d.availabilityStatus},${d.verifiedDonationsCount}`
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `blood_connection_national_donors_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-burgundy via-crimson to-burgundy text-white p-6 rounded-3xl border-2 border-gold shadow-royal">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-gold text-burgundy-dark font-extrabold text-[10px] uppercase">
              👑 Super Admin Control
            </span>
            <span className="text-xs text-gold-light">National Healthcare Directorate</span>
          </div>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-gold-metallic mt-1">
            Bangladesh National Blood Command Center
          </h2>
          <p className="text-xs text-ivory/90 mt-0.5">
            Real-time analytics, Row-Level Security policy enforcement, and 64-district operational oversight.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-metallic-gradient text-burgundy-dark font-extrabold text-xs shadow-gold-glow hover:scale-105 transition-all self-start sm:self-center"
        >
          <Download className="w-4 h-4" />
          <span>Export National Report (CSV)</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gold/30 text-xs font-bold gap-6">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'analytics'
              ? 'border-crimson text-crimson font-black'
              : 'border-transparent text-charcoal/60 hover:text-charcoal'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>National Analytics & Metrics</span>
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'audit'
              ? 'border-crimson text-crimson font-black'
              : 'border-transparent text-charcoal/60 hover:text-charcoal'
          }`}
        >
          <History className="w-4 h-4" />
          <span>System Audit Logs ({auditLogs.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'settings'
              ? 'border-crimson text-crimson font-black'
              : 'border-transparent text-charcoal/60 hover:text-charcoal'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>National Parameters & Rules</span>
        </button>
      </div>

      {activeTab === 'analytics' && (
        <>
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-gold/40 shadow-sm text-center">
              <span className="text-[10px] font-bold text-charcoal/60 uppercase block">Total Users</span>
              <span className="font-serif font-black text-2xl text-burgundy">{profiles.length}</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gold/40 shadow-sm text-center">
              <span className="text-[10px] font-bold text-charcoal/60 uppercase block">Registered Donors</span>
              <span className="font-serif font-black text-2xl text-crimson">{donors.length}</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gold/40 shadow-sm text-center">
              <span className="text-[10px] font-bold text-charcoal/60 uppercase block">Available (Eligible)</span>
              <span className="font-serif font-black text-2xl text-emerald-700">{availableDonors.length}</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gold/40 shadow-sm text-center">
              <span className="text-[10px] font-bold text-charcoal/60 uppercase block">3-Mo Cooldown</span>
              <span className="font-serif font-black text-2xl text-amber-700">{inCooldownDonors.length}</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gold/40 shadow-sm text-center">
              <span className="text-[10px] font-bold text-charcoal/60 uppercase block">Blood Requests</span>
              <span className="font-serif font-black text-2xl text-burgundy">{requests.length}</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gold/40 shadow-sm text-center">
              <span className="text-[10px] font-bold text-charcoal/60 uppercase block">Partner Orgs</span>
              <span className="font-serif font-black text-2xl text-gold-dark">{orgs.length}</span>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Blood Group Breakdown Chart */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gold/40 shadow-sm">
              <h3 className="font-serif font-bold text-base text-burgundy mb-2">
                Blood Group Distribution
              </h3>
              <p className="text-xs text-charcoal/70 mb-4">
                National supply ratio across 8 blood groups
              </p>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Division Donor Distribution Chart */}
            <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gold/40 shadow-sm">
              <h3 className="font-serif font-bold text-base text-burgundy mb-2">
                Division-Wise Donor Coverage
              </h3>
              <p className="text-xs text-charcoal/70 mb-4">
                Donors registered across all 8 administrative divisions of Bangladesh
              </p>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={divisionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0E8D8" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="donors" fill="#8B1028" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-gold/40 p-6 shadow-sm">
          <h3 className="font-serif font-bold text-lg text-burgundy mb-4">
            System Security & Activity Audit Trail
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-ivory-light border-b border-gold/30 text-charcoal font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Actor & Role</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Entity</th>
                  <th className="p-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/10">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-ivory/50">
                    <td className="p-3 font-mono text-charcoal/70 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span className="font-bold text-burgundy block">{log.actorName}</span>
                      <span className="text-[10px] text-crimson uppercase font-semibold">
                        {log.actorRole}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-charcoal">{log.action}</td>
                    <td className="p-3 font-mono text-charcoal/70">{log.entityType}</td>
                    <td className="p-3 text-charcoal/80 max-w-xs truncate">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-gold/40 p-6 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-burgundy border-b border-gold/20 pb-2">
            National Healthcare Platform Parameters
          </h3>

          <div className="space-y-4 max-w-xl text-xs">
            <div className="p-4 rounded-xl bg-ivory-light border border-gold/30 space-y-1">
              <span className="font-bold text-burgundy text-sm block">
                3-Month Automated Availability Interval
              </span>
              <p className="text-charcoal/70 leading-relaxed">
                Platform cooldown enforced on donor availability following verified donation. Configured standard: 3 calendar months.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold">
                  Status: ACTIVE (Enforced by PostgreSQL Triggers)
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-ivory-light border border-gold/30 space-y-1">
              <span className="font-bold text-burgundy text-sm block">
                National SMS & WhatsApp Emergency Broadcast Gateway
              </span>
              <p className="text-charcoal/70 leading-relaxed">
                Automated SMS alerts dispatched to compatible donors when a CRITICAL transfusion request is logged within their upazila/district.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold">
                  Gateway: Operational (Bangladesh Regional Hub)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
