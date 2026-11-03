import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { bloodConnectionStore } from '../services/store';
import { BloodGroup } from '../types';
import {
  HeartHandshake,
  Search,
  MapPin,
  Calendar,
  Clock,
  PhoneCall,
  ChevronRight,
  Filter,
} from 'lucide-react';

export const BloodRequestListPage: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('');

  const requests = bloodConnectionStore.getRequests();

  const filteredRequests = requests.filter((r) => {
    if (selectedGroup && r.bloodGroup !== selectedGroup) return false;
    if (selectedUrgency && r.urgency !== selectedUrgency) return false;
    return true;
  });

  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="bg-ivory min-h-screen py-10 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif font-black text-3xl sm:text-4xl text-burgundy">
              Active National Blood Requests
            </h1>
            <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
              Live emergency transfusions requiring immediate donor matching across Bangladesh.
            </p>
          </div>

          <Link
            to="/blood-request"
            className="px-5 py-2.5 rounded-full bg-gold-metallic-gradient text-burgundy-dark font-black text-xs sm:text-sm tracking-wide shadow-gold-glow flex items-center justify-center gap-2"
          >
            <HeartHandshake className="w-4 h-4 text-crimson" />
            <span>Post New Request</span>
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl border border-gold/40 p-4 shadow-sm mb-6 flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-crimson" />
            <span className="font-bold text-burgundy">Filters:</span>
          </div>

          <div>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="bg-ivory-light border border-gold/40 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-gold"
            >
              <option value="">All Blood Groups</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedUrgency}
              onChange={(e) => setSelectedUrgency(e.target.value)}
              className="bg-ivory-light border border-gold/40 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-gold"
            >
              <option value="">All Urgencies</option>
              <option value="CRITICAL">Critical</option>
              <option value="URGENT">Urgent</option>
              <option value="NORMAL">Normal</option>
            </select>
          </div>

          {(selectedGroup || selectedUrgency) && (
            <button
              onClick={() => {
                setSelectedGroup('');
                setSelectedUrgency('');
              }}
              className="text-crimson font-bold hover:underline ml-auto"
            >
              Clear
            </button>
          )}
        </div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className="rounded-2xl bg-white border border-gold/50 p-5 shadow-sm hover:shadow-card-gold transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      req.urgency === 'CRITICAL'
                        ? 'bg-red-100 text-red-800 border border-red-300 animate-pulse'
                        : req.urgency === 'URGENT'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-blue-100 text-blue-800 border border-blue-300'
                    }`}
                  >
                    {req.urgency}
                  </span>

                  <span className="text-[11px] font-bold text-charcoal/70">
                    Status: <span className="text-burgundy uppercase">{req.status}</span>
                  </span>
                </div>

                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-14 h-14 rounded-2xl bg-crimson text-white font-black text-2xl flex items-center justify-center border-2 border-gold shadow flex-shrink-0">
                    {req.bloodGroup}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-bold text-lg text-burgundy truncate">
                      {req.patientName}
                    </h3>
                    <p className="text-xs text-charcoal/70">
                      Required: <span className="font-bold text-crimson">{req.requiredUnits} unit(s)</span> ({req.fulfilledUnits} fulfilled)
                    </p>
                  </div>
                </div>

                <div className="text-xs text-charcoal/80 space-y-1.5 mb-4 bg-ivory-light p-3 rounded-xl border border-gold/20">
                  <p className="font-semibold text-burgundy truncate">
                    🏥 {req.hospitalName}
                  </p>
                  <p className="text-charcoal/70 text-[11px] truncate">
                    📍 {req.hospitalAddress}
                  </p>
                  <div className="flex items-center gap-3 pt-1 text-[11px] text-charcoal/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gold-dark" />
                      {req.requiredDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold-dark" />
                      {req.requiredTime}
                    </span>
                  </div>
                </div>

                {req.additionalNotes && (
                  <p className="text-[11px] text-charcoal/70 italic line-clamp-2 mb-3">
                    "{req.additionalNotes}"
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-gold/20 flex items-center justify-between gap-3">
                <a
                  href={`tel:${req.contactPhone}`}
                  className="flex items-center gap-1 text-xs font-bold text-crimson hover:underline"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call {req.contactPerson.split(' ')[0]}</span>
                </a>

                <Link
                  to={`/requests/${req.id}`}
                  className="px-4 py-2 rounded-lg bg-burgundy hover:bg-crimson text-gold text-xs font-bold transition-colors"
                >
                  View & Respond
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
