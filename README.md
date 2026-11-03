# BLOOD CONNECTION (ব্লাড কানেকশন)
### Bangladesh National Blood Donation & Management Ecosystem
**Tagline:** *Connecting Blood Donors. Saving Lives.*  
**Directorate General of Health Services (DGHS) Aligned**

---

## 🩸 Overview

**BLOOD CONNECTION** is a mission-critical, enterprise-grade national healthcare platform designed specifically for Bangladesh. It connects voluntary blood donors, emergency patients, hospital liaisons, medical volunteers, and administrators across **all 8 administrative divisions** and **all 64 districts**.

---

## 👑 Official Brand & Visual System

Designed in accordance with the official brand identity and homepage references:
- **Royal Crimson Red:** `#8B1028` (Primary action, urgency indicator, badges)
- **Deep Burgundy:** `#4A0D1C` (Headers, sidebars, hero gradient, borders)
- **Metallic Gold:** `#D4AF37` (Royal accents, CTA buttons, card borders, glowing rings)
- **Champagne Gold:** `#C6A15B` (Secondary borders, subtitles, metadata)
- **Warm Ivory:** `#F8F1E5` (Clean content canvas background)
- **Pure White:** `#FFFFFF` (Card backgrounds)
- **Charcoal:** `#242126` (Typography, deep contrast)
- **Typography:** Playfair Display (Luxury serif headings) & Inter / Hind Siliguri (Bilingual English & বাংলা body typography)

---

## 🏛️ 9 Complete Roles & Granular Permissions (PART 03 & PART 13)

1. **SUPER ADMIN:** National healthcare platform control, system settings, national analytics, audit logs.
2. **ADMIN:** Central operations directorate, blood request moderation, user approvals.
3. **DIVISION ADMIN:** Division-level operational oversight (e.g. Dhaka Division's 13 districts).
4. **DISTRICT COORDINATOR:** District-level donor matching, hospital liaison, and donation verification.
5. **UPAZILA COORDINATOR:** Localized thana/upazila field matching and immediate response.
6. **ORGANIZATION ADMIN:** Blood donation club portal (Red Crescent, Sandhani, Badhan, Quantum).
7. **VOLUNTEER:** Field response team, emergency pickup assistance, attendant support.
8. **DONOR:** Personal profile, 3-Month Automated Availability Tracker, Digital ID Card, donation history, certificates, and ratings.
9. **VISITOR:** Public search, emergency hospital blood request posting, and helpline access.

*Security Rule:* Administrative roles cannot be selected via public registration; they are enforced server-side and assigned via authorized invitation.

---

## 🪪 Digital ID Card System & QR Verification (PART 05)

Every approved account receives an individual **Digital ID Card**:
- **Design:** Front & Back 3D flip card in Royal Red, Deep Burgundy, Metallic Gold, and Holographic Bangladesh seal.
- **Data:** Name, unique ID number (`BC-DON-2026-XXXXX`), official role badge, blood group, assigned district/jurisdiction, issue date, and QR code.
- **Export & Sharing:** Download as high-resolution PNG, export to PDF, print-ready format, and 1-click social sharing (WhatsApp, Facebook, Telegram, Native Mobile Share).
- **QR Verification (`/verify/:token`):** Scanning the QR code opens the official government-style verification portal confirming active status, validity, and verified blood group while protecting private telephone numbers and home addresses.

---

## ⏱️ Automated 3-Month Availability Engine (PART 09)

- When a donation is verified by a coordinator or hospital:
  1. Donation record is archived.
  2. Verified donation count increments.
  3. Status immediately transitions to `UNAVAILABLE_TEMPORARY`.
  4. Next eligibility date is automatically scheduled 3 calendar months forward.
  5. Donor is issued an official **Certificate of Appreciation**.
- **Medical Disclaimer:** The 3-month platform cooldown is an automated safety interval and does not replace medical screening performed by blood bank physicians at the time of donation.

---

## 🗺️ Bangladesh National Location System (PART 07)

- **8 Divisions:** Dhaka, Chattogram, Rajshahi, Khulna, Barishal, Sylhet, Rangpur, Mymensingh.
- **64 Verified Districts:** Verified names in English and Bangla with relational mapping to their divisions.
- **Thanas / Upazilas:** Comprehensive mapping for all major urban and rural thanas across Bangladesh.
- **Cascading Dropdowns:** Division ➔ District ➔ Upazila.

---

## 🚀 Quick Start & Development

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation
```bash
# Clone the repository
git clone https://github.com/your-org/blood-connection.git
cd BLOODCONNECTION

# Install dependencies
npm install

# Run automated test suite (Vitest)
npm test

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 💾 Supabase Database & Security (PART 18, 19, 20, 21)

All PostgreSQL migrations and Edge Functions are pre-built in `supabase/`:
- `supabase/migrations/01_initial_schema.sql`: Complete 33 relational tables with UUIDs, foreign keys, indexes, and constraints.
- `supabase/migrations/02_rls_and_triggers.sql`: Strict Row-Level Security (RLS) policies for all 9 roles, automated 3-month cooldown triggers, automatic Digital ID generation triggers, and Supabase Storage bucket rules.
- `supabase/seed.sql`: Realistic administrative coordinators, hospitals, and verified donors.
- `supabase/edge-functions/`: Edge function handlers for `verify-id-card`, `update-donor-availability`, and `match-donors`.

---

## 🧪 Testing Suite (PART 24)

Automated tests cover:
- **Location Hierarchy:** Verifies all 8 divisions and 64 districts in Bangladesh.
- **3-Month Availability Rule:** Validates cooldown initiation, donation count increment, and next eligible date computation.
- **Digital ID & QR Verification:** Verifies token generation, valid lookup, and forged token rejection.
- **Role Switching & Registration:** Verifies multi-role authentication and automated ID card provisioning.

To execute tests:
```bash
npm test
```
Result: **12 tests passing across 4 suites.**

---

## 📜 License
Government & Healthcare Community Public License for Bangladesh. Developed for humanitarian blood donation ecosystem management.
