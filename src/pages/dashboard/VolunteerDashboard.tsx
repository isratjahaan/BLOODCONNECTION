import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { bloodConnectionStore } from '../../services/store';
import { DigitalIdCard } from '../../components/id/DigitalIdCard';
import {
  HeartHandshake,
  CheckCircle2,
  PhoneCall,
  Clock,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export const VolunteerDashboard: React.FC = () => {
  const { currentUser, currentIdCard } = useAuth();
  const requests = bloodConnectionStore.getRequests().slice(0, 3);
  const [completedTask, setCompletedTask] = useState<string | null>(null);

  const handleMarkDone = (id: string) => {
    setCompletedTask(id);
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-burgundy via-crimson to-burgundy text-white p-6 rounded-3xl border-2 border-gold shadow-royal flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-gold text-burgundy-dark font-extrabold text-[10px] uppercase">
            🤝 Field Volunteer Response Team
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-gold-metallic mt-1">
            Welcome, Volunteer {currentUser?.fullName}!
          </h2>
          <p className="text-xs text-ivory/80">
            Station: Mirpur & Uttara Field Response • ID: {currentIdCard?.idNumber}
          </p>
        </div>

        <div className="bg-burgundy-dark/90 border border-gold/50 p-3.5 rounded-2xl text-center self-start sm:self-center">
          <span className="text-[10px] uppercase font-bold text-gold-champagne block">
            Status
          </span>
          <span className="font-black text-sm text-emerald-400 block">
            ON-DUTY (ACTIVE)
          </span>
        </div>
      </div>

      {/* Assigned Tasks */}
      <div className="bg-white rounded-3xl border border-gold/40 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-lg text-burgundy">
          Assigned Emergency Donor Coordination Tasks
        </h3>

        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="p-4 rounded-2xl bg-ivory-light border border-gold/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-crimson text-white">
                    {req.urgency}
                  </span>
                  <span className="font-serif font-bold text-sm text-burgundy">
                    Facilitate Donor for {req.patientName} ({req.bloodGroup})
                  </span>
                </div>
                <p className="text-xs text-charcoal/70 mt-1">
                  🏥 {req.hospitalName} • Attendant: {req.contactPerson} ({req.contactPhone})
                </p>
              </div>

              {completedTask === req.id ? (
                <span className="px-3 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">
                  ✓ Task Marked Complete
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${req.contactPhone}`}
                    className="px-3 py-1.5 rounded-lg bg-white border border-gold text-crimson text-xs font-bold flex items-center gap-1 shadow-sm"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                  <button
                    onClick={() => handleMarkDone(req.id)}
                    className="px-3 py-1.5 rounded-lg bg-burgundy hover:bg-crimson text-gold text-xs font-bold transition-colors"
                  >
                    Mark Assisted
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Volunteer Digital ID */}
      {currentIdCard && (
        <div className="bg-white rounded-3xl border border-gold/40 p-6 sm:p-8 shadow-sm flex flex-col items-center">
          <h3 className="font-serif font-black text-xl text-burgundy mb-4">
            Official Volunteer ID Card
          </h3>
          <DigitalIdCard idCard={currentIdCard} showSharingControls={true} />
        </div>
      )}
    </div>
  );
};
