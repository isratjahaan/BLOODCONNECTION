import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, PhoneCall } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-ivory min-h-screen py-12 text-charcoal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center">
          <h1 className="font-serif font-black text-3xl sm:text-4xl text-burgundy">
            Official Contact & Emergency Helpdesk
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-2">
            Connect with the central secretariat or reach divisional blood coordinators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="bg-white rounded-3xl border-2 border-gold/40 p-8 shadow-sm space-y-6 text-xs">
            <h3 className="font-serif font-bold text-lg text-burgundy border-b border-gold/20 pb-2">
              National Headquarters
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-crimson flex-shrink-0" />
                <div>
                  <span className="font-bold text-charcoal block">Secretariat Address</span>
                  <span className="text-charcoal/70 leading-relaxed">
                    Directorate General of Health Services Complex, Mohakhali / Shahbagh, Dhaka 1212, Bangladesh
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <PhoneCall className="w-5 h-5 text-crimson flex-shrink-0" />
                <div>
                  <span className="font-bold text-charcoal block">Emergency Hotlines</span>
                  <span className="text-crimson font-black text-sm block">16263 (National Health)</span>
                  <span className="text-charcoal/70">+880 2 9330188 (Blood Emergency)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-crimson flex-shrink-0" />
                <div>
                  <span className="font-bold text-charcoal block">Official Email</span>
                  <span className="text-charcoal/70">support@bloodconnection.org.bd</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-white rounded-3xl border-2 border-gold/40 p-8 shadow-sm">
            <h3 className="font-serif font-bold text-lg text-burgundy mb-4">
              Send a Message to Administration
            </h3>

            {submitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Message received! A coordinator will get back to you shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-charcoal/80 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Mahfuzur Rahman"
                    className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-charcoal/80 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+88017..."
                    className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-charcoal/80 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your inquiry, coordinator request or partnership proposal..."
                    className="w-full bg-ivory-light border border-gold/40 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-burgundy hover:bg-crimson text-gold font-bold text-xs shadow transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
