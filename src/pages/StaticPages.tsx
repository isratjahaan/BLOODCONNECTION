import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-ivory min-h-screen py-12 text-charcoal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl border-2 border-gold/40 p-8 sm:p-12 shadow-royal space-y-6 text-xs sm:text-sm leading-relaxed text-charcoal/90">
        <h1 className="font-serif font-black text-2xl sm:text-3xl text-burgundy border-b border-gold/20 pb-3">
          National Healthcare Privacy Policy
        </h1>
        <p className="text-xs text-charcoal/60">Effective Date: January 1, 2026</p>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-base text-burgundy">1. Donor Privacy Shielding</h3>
          <p>
            BLOOD CONNECTION does not publicly disclose sensitive personally identifiable information (PII). When an ID card's QR code is scanned or donor search results are displayed, private home addresses and direct phone numbers are shielded to prevent harassment or spam.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-base text-burgundy">2. Role-Based Access Control (RBAC)</h3>
          <p>
            All administrative access is partitioned by geographic boundaries and authorized roles in compliance with Bangladesh Cyber Security protocols and PostgreSQL Row Level Security (RLS).
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-base text-burgundy">3. Medical Screening Disclosure</h3>
          <p>
            Donation availability records are maintained for scheduling and safety co-ordination only. Final clinical eligibility and pre-donation testing are conducted exclusively by authorized blood banks.
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-ivory min-h-screen py-12 text-charcoal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl border-2 border-gold/40 p-8 sm:p-12 shadow-royal space-y-6 text-xs sm:text-sm leading-relaxed text-charcoal/90">
        <h1 className="font-serif font-black text-2xl sm:text-3xl text-burgundy border-b border-gold/20 pb-3">
          Terms of Service & Donor Charter
        </h1>
        <p className="text-xs text-charcoal/60">Effective Date: January 1, 2026</p>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-base text-burgundy">1. Voluntary Non-Remunerated Donation</h3>
          <p>
            All blood donation facilitated through BLOOD CONNECTION must be 100% voluntary and unpaid. Monetization, sale, or brokering of blood is strictly illegal under the laws of Bangladesh and results in immediate account revocation and legal referral.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-base text-burgundy">2. 3-Month Availability Compliance</h3>
          <p>
            Registered donors agree to the 3-month platform cooldown rule following a verified donation. Deliberately misrepresenting donation history is a violation of platform safety rules.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-base text-burgundy">3. Emergency Responsibility</h3>
          <p>
            While coordinators strive to fulfill all blood requests, BLOOD CONNECTION acts as a voluntary matching network. Medical emergencies should simultaneously pursue hospital blood bank stocks.
          </p>
        </section>
      </div>
    </div>
  );
};

export const HelpPage: React.FC = () => {
  const faqs = [
    {
      q: 'How does the 3-month availability rule work?',
      a: 'Following every verified donation, the platform automatically schedules an eligibility cooldown for 3 calendar months. Donors are marked as "In 3-Month Cooldown" until the date elapses, safeguarding donor health.',
    },
    {
      q: 'How is my Digital ID Card verified?',
      a: 'Each ID card contains a cryptographic token linked to `/verify/:token`. When scanned by a coordinator, hospital staff, or recipient, it confirms valid registration and active status without leaking private contact information.',
    },
    {
      q: 'How do I request blood for an emergency patient?',
      a: 'Click "Request Blood" on the homepage or header, provide patient blood group, hospital name and required units. It is immediately broadcasted to local district coordinators and eligible donors.',
    },
    {
      q: 'Can anyone create an administrative account?',
      a: 'No. As a strict security rule, public registration only allows voluntary donor registration. All coordinator and administrative roles are assigned through authorized governmental verification.',
    },
  ];

  return (
    <div className="bg-ivory min-h-screen py-12 text-charcoal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center">
          <h1 className="font-serif font-black text-3xl sm:text-4xl text-burgundy">
            Frequently Asked Questions & Help Center
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-2">
            Guidelines on donor eligibility, digital identity cards, and emergency request dispatch.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gold/40 p-6 shadow-sm space-y-2"
            >
              <h3 className="font-serif font-bold text-base text-burgundy">{faq.q}</h3>
              <p className="text-xs text-charcoal/80 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
