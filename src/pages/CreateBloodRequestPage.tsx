import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bloodConnectionStore } from '../services/store';
import {
  BANGLADESH_DIVISIONS,
  getDistrictsByDivision,
  getUpazilasByDistrict,
} from '../data/bangladeshLocations';
import { BloodGroup, RequestUrgency } from '../types';
import {
  HeartHandshake,
  AlertCircle,
  Building,
  Calendar,
  Phone,
  User,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const CreateBloodRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [patientName, setPatientName] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O+');
  const [requiredUnits, setRequiredUnits] = useState(2);
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [divisionId, setDivisionId] = useState('dhaka');
  const [districtId, setDistrictId] = useState('dhaka');
  const [upazilaId, setUpazilaId] = useState('shahbagh');
  const [requiredDate, setRequiredDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [requiredTime, setRequiredTime] = useState('14:00');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [urgency, setUrgency] = useState<RequestUrgency>('URGENT');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [successId, setSuccessId] = useState<string | null>(null);

  const districts = divisionId ? getDistrictsByDivision(divisionId) : [];
  const upazilas = districtId ? getUpazilasByDistrict(districtId) : [];

  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // Real-time matching calculation
  const matchingDonors = bloodConnectionStore.getMatchingDonors(bloodGroup, districtId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq = bloodConnectionStore.createRequest({
      patientName,
      bloodGroup,
      requiredUnits,
      hospitalName,
      hospitalAddress,
      divisionId,
      districtId,
      upazilaId,
      requiredDate,
      requiredTime,
      contactPerson,
      contactPhone,
      urgency,
      additionalNotes,
      createdById: currentUser ? currentUser.id : 'guest-requester',
    });

    setSuccessId(newReq.id);
  };

  return (
    <div className="bg-ivory min-h-screen py-10 text-charcoal">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {successId ? (
          <div className="bg-white rounded-3xl border-2 border-gold/40 p-8 text-center shadow-royal">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 mx-auto flex items-center justify-center text-emerald-600 mb-4 shadow">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="font-serif font-black text-3xl text-burgundy">
              Blood Request Dispatched!
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/70 mt-2 mb-6">
              Your request for <span className="font-bold text-crimson">{requiredUnits} unit(s) of {bloodGroup}</span> at {hospitalName} has been broadcasted to nearby coordinators and eligible voluntary donors.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate(`/requests/${successId}`)}
                className="px-6 py-2.5 rounded-full bg-burgundy hover:bg-crimson text-gold font-bold text-xs sm:text-sm transition-colors shadow"
              >
                Track Request Status
              </button>
              <button
                onClick={() => navigate('/donors')}
                className="px-6 py-2.5 rounded-full border border-gold text-burgundy font-bold text-xs sm:text-sm transition-colors"
              >
                Search More Donors Directly
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border-2 border-gold/40 p-6 sm:p-10 shadow-royal">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-crimson-50 border border-gold mx-auto flex items-center justify-center text-crimson mb-3 shadow-sm">
                <HeartHandshake className="w-8 h-8 fill-crimson text-crimson" />
              </div>
              <h1 className="font-serif font-black text-3xl sm:text-4xl text-burgundy">
                Create Emergency Blood Request
              </h1>
              <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
                Relayed directly to verified donors, hospital liaisons and district coordinators across Bangladesh.
              </p>
            </div>

            {/* Live Matching Donor Alert Pill */}
            <div className="mb-6 p-3.5 rounded-2xl bg-gold-light/30 border border-gold flex items-center justify-between text-xs font-bold text-burgundy">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-crimson" />
                <span>
                  Currently Available & Compatible Donors in this District:{' '}
                  <span className="font-black text-crimson text-sm">{matchingDonors.length}</span>
                </span>
              </div>
              <span className="text-[10px] text-charcoal/70 uppercase">3-Month Cooldown Verified</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient Details */}
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-base text-burgundy border-b border-gold/20 pb-1">
                  1. Patient & Transfusion Urgency
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Patient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="e.g. Mrs. Rokeya Begum"
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Required Blood Group *
                    </label>
                    <select
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                      className="w-full bg-ivory-light border-2 border-gold rounded-lg px-3 py-2 text-sm font-bold text-burgundy focus:ring-2 focus:ring-crimson"
                    >
                      {bloodGroups.map((bg) => (
                        <option key={bg} value={bg}>
                          {bg}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Required Units (Bags) *
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      required
                      value={requiredUnits}
                      onChange={(e) => setRequiredUnits(Number(e.target.value))}
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Urgency Priority Level *
                    </label>
                    <select
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value as RequestUrgency)}
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs font-bold text-crimson focus:ring-2 focus:ring-gold"
                    >
                      <option value="CRITICAL">CRITICAL (Needed within 1-4 hours)</option>
                      <option value="URGENT">URGENT (Needed within 24 hours)</option>
                      <option value="NORMAL">NORMAL (Planned surgery in 2-3 days)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Hospital Location */}
              <div className="space-y-4 pt-2">
                <h3 className="font-serif font-bold text-base text-burgundy border-b border-gold/20 pb-1">
                  2. Hospital & Transfusion Location
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Hospital / Clinic Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      placeholder="e.g. Dhaka Medical College Hospital (DMCH)"
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Hospital Address / Ward / Cabin No. *
                    </label>
                    <input
                      type="text"
                      required
                      value={hospitalAddress}
                      onChange={(e) => setHospitalAddress(e.target.value)}
                      placeholder="e.g. Ward 4, Bed 12, Secretariat Rd, Shahbagh"
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Division *
                    </label>
                    <select
                      required
                      value={divisionId}
                      onChange={(e) => {
                        setDivisionId(e.target.value);
                        setDistrictId('');
                        setUpazilaId('');
                      }}
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                    >
                      {BANGLADESH_DIVISIONS.map((div) => (
                        <option key={div.id} value={div.id}>
                          {div.name} ({div.bnName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      District *
                    </label>
                    <select
                      required
                      value={districtId}
                      onChange={(e) => {
                        setDistrictId(e.target.value);
                        setUpazilaId('');
                      }}
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                    >
                      {districts.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name} ({d.bnName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Thana / Upazila *
                    </label>
                    <select
                      required
                      value={upazilaId}
                      onChange={(e) => setUpazilaId(e.target.value)}
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                    >
                      {upazilas.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.name} ({u.bnName})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Required Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={requiredDate}
                      onChange={(e) => setRequiredDate(e.target.value)}
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Required Time *
                    </label>
                    <input
                      type="time"
                      required
                      value={requiredTime}
                      onChange={(e) => setRequiredTime(e.target.value)}
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 pt-2">
                <h3 className="font-serif font-bold text-base text-burgundy border-b border-gold/20 pb-1">
                  3. Contact Person on Duty
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="e.g. Ziaul Hoque (Patient's Brother)"
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal/80 mb-1">
                      Contact Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+8801712..."
                      className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal/80 mb-1">
                    Clinical Details / Notes for Donors
                  </label>
                  <textarea
                    rows={3}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="e.g. Surgery scheduled tomorrow 10 AM. Hospital blood bank requires cross-matching blood 2 hours prior."
                    className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gold-metallic-gradient text-burgundy-dark font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow hover:scale-[1.02] transition-transform"
              >
                <span>Broadcast Blood Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
