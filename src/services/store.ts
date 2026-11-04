import {
  UserProfile,
  DonorProfile,
  DigitalIdCard,
  BloodRequest,
  DonationRecord,
  DonorReview,
  Organization,
  DonationCampaign,
  DonationCertificate,
  SystemAuditLog,
  NotificationItem,
  UserRole,
  BloodGroup,
} from '../types';

const STORAGE_KEYS = {
  CURRENT_USER: 'bc_current_user',
  PROFILES: 'bc_profiles',
  DONORS: 'bc_donors',
  ID_CARDS: 'bc_id_cards',
  REQUESTS: 'bc_requests',
  DONATIONS: 'bc_donations',
  REVIEWS: 'bc_reviews',
  ORGANIZATIONS: 'bc_organizations',
  CAMPAIGNS: 'bc_campaigns',
  CERTIFICATES: 'bc_certificates',
  AUDIT_LOGS: 'bc_audit_logs',
  NOTIFICATIONS: 'bc_notifications',
};

// INITIAL SEED USERS FOR ALL 9 ROLES
export const SEED_PROFILES: UserProfile[] = [
  {
    id: 'user-superadmin',
    email: 'superadmin@bloodconnection.gov.bd',
    fullName: 'Dr. Rafiqul Islam Chowdhury',
    bnName: 'ড. রফিকুল ইসলাম চৌধুরী',
    role: 'SUPER_ADMIN',
    phone: '+8801711000001',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=256',
    divisionId: 'dhaka',
    districtId: 'dhaka',
    upazilaId: 'shahbagh',
    assignedJurisdiction: 'National Headquarters - Bangladesh',
    isVerified: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2026-01-15T00:00:00Z',
  },
  {
    id: 'user-admin',
    email: 'admin.central@bloodconnection.org.bd',
    fullName: 'Nusrat Jahan Tanha',
    bnName: 'নুসরাত জাহান তানহা',
    role: 'ADMIN',
    phone: '+8801711000002',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    divisionId: 'dhaka',
    districtId: 'dhaka',
    upazilaId: 'dhanmondi',
    assignedJurisdiction: 'Central Operations Directorate',
    isVerified: true,
    createdAt: '2025-01-10T00:00:00Z',
    updatedAt: '2026-02-01T00:00:00Z',
  },
  {
    id: 'user-divadmin',
    email: 'dhaka.division@bloodconnection.org.bd',
    fullName: 'Mohammad Farhad Hossain',
    bnName: 'মোহাম্মদ ফারহাদ হোসেন',
    role: 'DIVISION_ADMIN',
    phone: '+8801711000003',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
    divisionId: 'dhaka',
    districtId: 'dhaka',
    upazilaId: 'motijheel',
    assignedJurisdiction: 'Dhaka Division (13 Districts)',
    isVerified: true,
    createdAt: '2025-02-01T00:00:00Z',
    updatedAt: '2026-02-10T00:00:00Z',
  },
  {
    id: 'user-distcoord',
    email: 'chattogram.district@bloodconnection.org.bd',
    fullName: 'Kazi Tanvir Ahmed',
    bnName: 'কাজী তানভীর আহমেদ',
    role: 'DISTRICT_COORDINATOR',
    phone: '+8801711000004',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
    divisionId: 'chattogram',
    districtId: 'chattogram',
    upazilaId: 'panchlaish',
    assignedJurisdiction: 'Chattogram District',
    isVerified: true,
    createdAt: '2025-02-15T00:00:00Z',
    updatedAt: '2026-02-12T00:00:00Z',
  },
  {
    id: 'user-upzcoord',
    email: 'dhanmondi.coord@bloodconnection.org.bd',
    fullName: 'Shaila Sharmin',
    bnName: 'শায়লা শারমিন',
    role: 'UPAZILA_COORDINATOR',
    phone: '+8801711000005',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=256',
    divisionId: 'dhaka',
    districtId: 'dhaka',
    upazilaId: 'dhanmondi',
    assignedJurisdiction: 'Dhanmondi Thana, Dhaka',
    isVerified: true,
    createdAt: '2025-03-01T00:00:00Z',
    updatedAt: '2026-02-01T00:00:00Z',
  },
  {
    id: 'user-orgadmin',
    email: 'sandhani.dmc@bloodconnection.org.bd',
    fullName: 'Dr. Ahsan Habib',
    bnName: 'ডা. আহসান হাবীব',
    role: 'ORGANIZATION_ADMIN',
    phone: '+8801711000006',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256',
    divisionId: 'dhaka',
    districtId: 'dhaka',
    upazilaId: 'shahbagh',
    organizationId: 'org-sandhani',
    organizationName: 'Sandhani Blood Donation Club (DMC Unit)',
    isVerified: true,
    createdAt: '2025-01-20T00:00:00Z',
    updatedAt: '2026-01-20T00:00:00Z',
  },
  {
    id: 'user-volunteer',
    email: 'sakib.volunteer@bloodconnection.org.bd',
    fullName: 'Sakib Al Hasan Shanto',
    bnName: 'সাকিব আল হাসান শান্ত',
    role: 'VOLUNTEER',
    phone: '+8801711000007',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=256',
    divisionId: 'dhaka',
    districtId: 'dhaka',
    upazilaId: 'mirpur',
    assignedJurisdiction: 'Mirpur & Uttara Field Response Team',
    isVerified: true,
    createdAt: '2025-04-10T00:00:00Z',
    updatedAt: '2026-02-01T00:00:00Z',
  },
  {
    id: 'user-donor-primary',
    email: 'donor.tariq@gmail.com',
    fullName: 'Tariqul Islam Roni',
    bnName: 'তরিকুল ইসলাম রনি',
    role: 'DONOR',
    phone: '+8801819000008',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=256',
    divisionId: 'dhaka',
    districtId: 'dhaka',
    upazilaId: 'dhanmondi',
    address: 'House 42, Road 7/A, Dhanmondi',
    isVerified: true,
    createdAt: '2025-05-15T00:00:00Z',
    updatedAt: '2026-02-15T00:00:00Z',
  },
  {
    id: 'user-visitor',
    email: 'visitor@guest.bloodconnection.org.bd',
    fullName: 'Guest Citizen / Recipient',
    bnName: 'সাধারণ নাগরিক / গ্রহীতা',
    role: 'VISITOR',
    phone: '+8801911000009',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256',
    divisionId: 'dhaka',
    districtId: 'dhaka',
    isVerified: false,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
];

// DONOR PROFILES WITH 3-MONTH COOLDOWN TRACKING & RATINGS
export const SEED_DONORS: DonorProfile[] = [
  {
    id: 'donor-1',
    userId: 'user-donor-primary',
    bloodGroup: 'O+',
    rhFactor: '+',
    dateOfBirth: '1996-08-14',
    gender: 'male',
    lastDonationDate: '2025-11-20',
    nextEligibleDate: '2026-02-20', // Eligible now!
    availabilityStatus: 'AVAILABLE',
    manualAvailabilityOptIn: true,
    verifiedDonationsCount: 14,
    totalUnitsDonated: 14,
    averageRating: 4.95,
    reviewsCount: 12,
    emergencyContactName: 'Kamal Hossain (Brother)',
    emergencyContactPhone: '+8801711223344',
    preferredContactMethod: 'phone',
    isAvailableForEmergency: true,
    medicalClearanceWarningAccepted: true,
    badges: [
      { id: 'b1', name: 'Platinum Life Saver', bnName: 'প্লাটিনাম লাইফ সেভার', description: 'Verified 10+ blood donations', icon: 'Award', earnedDate: '2025-08-10' },
      { id: 'b2', name: 'Emergency Responder', bnName: 'জরুরী সাড়াদানকারী', description: 'Responded to critical SOS requests within 1 hour', icon: 'Zap', earnedDate: '2025-10-02' },
      { id: 'b3', name: 'Golden Drop', bnName: 'স্বর্ণবিন্দু দাতা', description: 'Recognized by Bangladesh Red Crescent', icon: 'ShieldCheck', earnedDate: '2025-12-01' }
    ]
  },
  {
    id: 'donor-2',
    userId: 'user-donor-2',
    bloodGroup: 'A+',
    rhFactor: '+',
    dateOfBirth: '1998-03-22',
    gender: 'female',
    lastDonationDate: '2026-01-10',
    nextEligibleDate: '2026-04-10', // Still in 3-month cooldown!
    availabilityStatus: 'UNAVAILABLE_TEMPORARY',
    manualAvailabilityOptIn: true,
    verifiedDonationsCount: 6,
    totalUnitsDonated: 6,
    averageRating: 5.0,
    reviewsCount: 5,
    preferredContactMethod: 'whatsapp',
    isAvailableForEmergency: false,
    medicalClearanceWarningAccepted: true,
    badges: [
      { id: 'b4', name: 'Life Saver Silver', bnName: 'রৌপ্য জীবন রক্ষক', description: '5+ verified donations', icon: 'Award', earnedDate: '2025-11-01' }
    ]
  },
  {
    id: 'donor-3',
    userId: 'user-donor-3',
    bloodGroup: 'B+',
    rhFactor: '+',
    dateOfBirth: '1995-11-05',
    gender: 'male',
    lastDonationDate: '2025-10-15',
    nextEligibleDate: '2026-01-15',
    availabilityStatus: 'AVAILABLE',
    manualAvailabilityOptIn: true,
    verifiedDonationsCount: 9,
    totalUnitsDonated: 9,
    averageRating: 4.88,
    reviewsCount: 8,
    preferredContactMethod: 'phone',
    isAvailableForEmergency: true,
    medicalClearanceWarningAccepted: true,
    badges: [
      { id: 'b5', name: 'Life Saver Gold', bnName: 'স্বর্ণ জীবন রক্ষক', description: '8+ verified donations', icon: 'Award', earnedDate: '2025-12-15' }
    ]
  },
  {
    id: 'donor-4',
    userId: 'user-donor-4',
    bloodGroup: 'AB+',
    rhFactor: '+',
    dateOfBirth: '1997-06-18',
    gender: 'male',
    lastDonationDate: '2025-09-01',
    nextEligibleDate: '2025-12-01',
    availabilityStatus: 'AVAILABLE',
    manualAvailabilityOptIn: true,
    verifiedDonationsCount: 11,
    totalUnitsDonated: 11,
    averageRating: 4.9,
    reviewsCount: 10,
    preferredContactMethod: 'phone',
    isAvailableForEmergency: true,
    medicalClearanceWarningAccepted: true,
    badges: [
      { id: 'b1', name: 'Platinum Life Saver', bnName: 'প্লাটিনাম লাইফ সেভার', description: 'Verified 10+ blood donations', icon: 'Award', earnedDate: '2025-07-20' }
    ]
  },
  {
    id: 'donor-5',
    userId: 'user-donor-5',
    bloodGroup: 'O-',
    rhFactor: '-',
    dateOfBirth: '1994-04-12',
    gender: 'female',
    lastDonationDate: '2025-12-05',
    nextEligibleDate: '2026-03-05', // Within 3-month cooldown
    availabilityStatus: 'UNAVAILABLE_TEMPORARY',
    manualAvailabilityOptIn: true,
    verifiedDonationsCount: 18,
    totalUnitsDonated: 18,
    averageRating: 5.0,
    reviewsCount: 16,
    preferredContactMethod: 'in_app',
    isAvailableForEmergency: true,
    medicalClearanceWarningAccepted: true,
    badges: [
      { id: 'b6', name: 'Universal Hero (O-)', bnName: 'সর্বজনীন বীর (O-)', description: 'Rare universal blood donor', icon: 'Sparkles', earnedDate: '2024-05-12' },
      { id: 'b1', name: 'Platinum Life Saver', bnName: 'প্লাটিনাম লাইফ সেভার', description: 'Verified 10+ blood donations', icon: 'Award', earnedDate: '2025-01-10' }
    ]
  },
  {
    id: 'donor-6',
    userId: 'user-donor-6',
    bloodGroup: 'A-',
    rhFactor: '-',
    dateOfBirth: '1993-09-29',
    gender: 'male',
    lastDonationDate: '2025-08-10',
    nextEligibleDate: '2025-11-10',
    availabilityStatus: 'AVAILABLE',
    manualAvailabilityOptIn: true,
    verifiedDonationsCount: 7,
    totalUnitsDonated: 7,
    averageRating: 4.85,
    reviewsCount: 6,
    preferredContactMethod: 'phone',
    isAvailableForEmergency: true,
    medicalClearanceWarningAccepted: true,
    badges: [
      { id: 'b4', name: 'Life Saver Silver', bnName: 'রৌপ্য জীবন রক্ষক', description: '5+ verified donations', icon: 'Award', earnedDate: '2025-09-01' }
    ]
  },
  {
    id: 'donor-7',
    userId: 'user-donor-7',
    bloodGroup: 'B-',
    rhFactor: '-',
    dateOfBirth: '1999-01-15',
    gender: 'female',
    lastDonationDate: '2025-10-30',
    nextEligibleDate: '2026-01-30',
    availabilityStatus: 'AVAILABLE',
    manualAvailabilityOptIn: true,
    verifiedDonationsCount: 5,
    totalUnitsDonated: 5,
    averageRating: 5.0,
    reviewsCount: 4,
    preferredContactMethod: 'whatsapp',
    isAvailableForEmergency: true,
    medicalClearanceWarningAccepted: true,
    badges: [
      { id: 'b4', name: 'Life Saver Silver', bnName: 'রৌপ্য জীবন রক্ষক', description: '5+ verified donations', icon: 'Award', earnedDate: '2025-10-30' }
    ]
  },
  {
    id: 'donor-8',
    userId: 'user-donor-8',
    bloodGroup: 'AB-',
    rhFactor: '-',
    dateOfBirth: '1992-12-08',
    gender: 'male',
    lastDonationDate: '2025-07-14',
    nextEligibleDate: '2025-10-14',
    availabilityStatus: 'AVAILABLE',
    manualAvailabilityOptIn: true,
    verifiedDonationsCount: 15,
    totalUnitsDonated: 15,
    averageRating: 4.98,
    reviewsCount: 14,
    preferredContactMethod: 'phone',
    isAvailableForEmergency: true,
    medicalClearanceWarningAccepted: true,
    badges: [
      { id: 'b7', name: 'Ultra-Rare Champion (AB-)', bnName: 'অতি বিরল গ্রুপের বীর', description: 'Top AB- donor in Bangladesh', icon: 'Crown', earnedDate: '2024-11-01' },
      { id: 'b1', name: 'Platinum Life Saver', bnName: 'প্লাটিনাম লাইফ সেভার', description: 'Verified 10+ blood donations', icon: 'Award', earnedDate: '2025-04-12' }
    ]
  }
];

// ADDITIONAL DONOR USER PROFILES FOR SEARCH RESULTS
export const ADDITIONAL_DONOR_USERS: UserProfile[] = [
  {
    id: 'user-donor-2',
    email: 'samia.akhtar@gmail.com',
    fullName: 'Dr. Samia Akhtar',
    bnName: 'ডা. সামিয়া আক্তার',
    role: 'DONOR',
    phone: '+8801711223302',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813591-9e7943d601b0?auto=format&fit=crop&q=80&w=256',
    divisionId: 'dhaka',
    districtId: 'dhaka',
    upazilaId: 'gulshan',
    address: 'Gulshan-2, Dhaka',
    isVerified: true,
    createdAt: '2025-06-01T00:00:00Z',
    updatedAt: '2026-01-10T00:00:00Z',
  },
  {
    id: 'user-donor-3',
    email: 'mahmud.chittagong@gmail.com',
    fullName: 'Mahmudul Hasan',
    bnName: 'মাহমুদুল হাসান',
    role: 'DONOR',
    phone: '+8801819334403',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
    divisionId: 'chattogram',
    districtId: 'chattogram',
    upazilaId: 'panchlaish',
    address: 'Nasirabad, Chattogram',
    isVerified: true,
    createdAt: '2025-06-15T00:00:00Z',
    updatedAt: '2026-01-15T00:00:00Z',
  },
  {
    id: 'user-donor-4',
    email: 'zahid.rajshahi@gmail.com',
    fullName: 'Zahid Hossain',
    bnName: 'জাহিদ হোসেন',
    role: 'DONOR',
    phone: '+8801711445504',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256',
    divisionId: 'rajshahi',
    districtId: 'rajshahi',
    upazilaId: 'boalia',
    address: 'Shaheb Bazar, Rajshahi',
    isVerified: true,
    createdAt: '2025-07-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'user-donor-5',
    email: 'fatema.sylhet@gmail.com',
    fullName: 'Fatema Tuz Zohra',
    bnName: 'ফাতেমা তুজ জোহরা',
    role: 'DONOR',
    phone: '+8801711556605',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
    divisionId: 'sylhet',
    districtId: 'sylhet',
    upazilaId: 'sylhet-sadar',
    address: 'Zindabazar, Sylhet',
    isVerified: true,
    createdAt: '2025-04-01T00:00:00Z',
    updatedAt: '2026-02-05T00:00:00Z',
  },
  {
    id: 'user-donor-6',
    email: 'anwar.khulna@gmail.com',
    fullName: 'Anwar Parvez',
    bnName: 'আনোয়ার পারভেজ',
    role: 'DONOR',
    phone: '+8801711667706',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=256',
    divisionId: 'khulna',
    districtId: 'khulna',
    upazilaId: 'sonadanga',
    address: 'Sonadanga, Khulna',
    isVerified: true,
    createdAt: '2025-08-10T00:00:00Z',
    updatedAt: '2026-01-20T00:00:00Z',
  },
  {
    id: 'user-donor-7',
    email: 'nadia.barishal@gmail.com',
    fullName: 'Nadia Sultana',
    bnName: 'নাদিয়া সুলতানা',
    role: 'DONOR',
    phone: '+8801711778807',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    divisionId: 'barishal',
    districtId: 'barishal',
    upazilaId: 'barishal-sadar',
    address: 'Band Road, Barishal',
    isVerified: true,
    createdAt: '2025-09-01T00:00:00Z',
    updatedAt: '2026-01-30T00:00:00Z',
  },
  {
    id: 'user-donor-8',
    email: 'mustafiz.rangpur@gmail.com',
    fullName: 'Mustafizur Rahman',
    bnName: 'মুস্তাফিজুর রহমান',
    role: 'DONOR',
    phone: '+8801711889908',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
    divisionId: 'rangpur',
    districtId: 'rangpur',
    upazilaId: 'rangpur-sadar',
    address: 'Jahaj Company Mor, Rangpur',
    isVerified: true,
    createdAt: '2025-03-20T00:00:00Z',
    updatedAt: '2026-02-01T00:00:00Z',
  }
];

// DIGITAL ID CARDS FOR ALL 9 ROLES WITH WORKING VERIFICATION TOKENS
export const SEED_ID_CARDS: DigitalIdCard[] = [
  {
    id: 'id-superadmin',
    userId: 'user-superadmin',
    role: 'SUPER_ADMIN',
    idNumber: 'BC-SAD-2026-00001',
    verificationToken: 'bc-token-superadmin',
    fullName: 'Dr. Rafiqul Islam Chowdhury',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=256',
    assignedDivision: 'National Level',
    assignedDistrict: 'All 64 Districts',
    organizationName: 'Bangladesh National Blood Board',
    status: 'ACTIVE',
    issueDate: '2025-01-01',
    expiryDate: '2028-12-31',
    qrPayload: 'https://bloodconnection.org.bd/verify/bc-token-superadmin',
  },
  {
    id: 'id-admin',
    userId: 'user-admin',
    role: 'ADMIN',
    idNumber: 'BC-ADM-2026-00042',
    verificationToken: 'bc-token-admin',
    fullName: 'Nusrat Jahan Tanha',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    assignedDivision: 'Dhaka Division',
    assignedDistrict: 'Central Secretariat',
    status: 'ACTIVE',
    issueDate: '2025-01-10',
    expiryDate: '2027-12-31',
    qrPayload: 'https://bloodconnection.org.bd/verify/bc-token-admin',
  },
  {
    id: 'id-divadmin',
    userId: 'user-divadmin',
    role: 'DIVISION_ADMIN',
    idNumber: 'BC-DIV-2026-01003',
    verificationToken: 'bc-token-divadmin',
    fullName: 'Mohammad Farhad Hossain',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
    assignedDivision: 'Dhaka Division',
    status: 'ACTIVE',
    issueDate: '2025-02-01',
    expiryDate: '2027-12-31',
    qrPayload: 'https://bloodconnection.org.bd/verify/bc-token-divadmin',
  },
  {
    id: 'id-distcoord',
    userId: 'user-distcoord',
    role: 'DISTRICT_COORDINATOR',
    idNumber: 'BC-DIS-2026-02014',
    verificationToken: 'bc-token-distcoord',
    fullName: 'Kazi Tanvir Ahmed',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
    assignedDivision: 'Chattogram Division',
    assignedDistrict: 'Chattogram District',
    status: 'ACTIVE',
    issueDate: '2025-02-15',
    expiryDate: '2027-12-31',
    qrPayload: 'https://bloodconnection.org.bd/verify/bc-token-distcoord',
  },
  {
    id: 'id-upzcoord',
    userId: 'user-upzcoord',
    role: 'UPAZILA_COORDINATOR',
    idNumber: 'BC-UPZ-2026-03025',
    verificationToken: 'bc-token-upzcoord',
    fullName: 'Shaila Sharmin',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=256',
    assignedDivision: 'Dhaka Division',
    assignedDistrict: 'Dhaka',
    assignedUpazila: 'Dhanmondi Thana',
    status: 'ACTIVE',
    issueDate: '2025-03-01',
    expiryDate: '2027-12-31',
    qrPayload: 'https://bloodconnection.org.bd/verify/bc-token-upzcoord',
  },
  {
    id: 'id-orgadmin',
    userId: 'user-orgadmin',
    role: 'ORGANIZATION_ADMIN',
    idNumber: 'BC-ORG-2026-04006',
    verificationToken: 'bc-token-orgadmin',
    fullName: 'Dr. Ahsan Habib',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256',
    assignedDivision: 'Dhaka',
    organizationName: 'Sandhani Blood Donation Club (DMC)',
    status: 'ACTIVE',
    issueDate: '2025-01-20',
    expiryDate: '2027-12-31',
    qrPayload: 'https://bloodconnection.org.bd/verify/bc-token-orgadmin',
  },
  {
    id: 'id-volunteer',
    userId: 'user-volunteer',
    role: 'VOLUNTEER',
    idNumber: 'BC-VOL-2026-05077',
    verificationToken: 'bc-token-volunteer',
    fullName: 'Sakib Al Hasan Shanto',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=256',
    assignedDivision: 'Dhaka',
    assignedDistrict: 'Dhaka',
    assignedUpazila: 'Mirpur Field Station',
    status: 'ACTIVE',
    issueDate: '2025-04-10',
    expiryDate: '2027-12-31',
    qrPayload: 'https://bloodconnection.org.bd/verify/bc-token-volunteer',
  },
  {
    id: 'id-donor-primary',
    userId: 'user-donor-primary',
    role: 'DONOR',
    idNumber: 'BC-DON-2026-98142',
    verificationToken: 'bc-token-donor1',
    fullName: 'Tariqul Islam Roni',
    bloodGroup: 'O+',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=256',
    assignedDivision: 'Dhaka',
    assignedDistrict: 'Dhaka',
    assignedUpazila: 'Dhanmondi',
    status: 'ACTIVE',
    issueDate: '2025-05-15',
    expiryDate: '2028-05-15',
    donationCount: 14,
    qrPayload: 'https://bloodconnection.org.bd/verify/bc-token-donor1',
  },
  {
    id: 'id-donor-2',
    userId: 'user-donor-2',
    role: 'DONOR',
    idNumber: 'BC-DON-2026-98143',
    verificationToken: 'bc-token-donor2',
    fullName: 'Dr. Samia Akhtar',
    bloodGroup: 'A+',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813591-9e7943d601b0?auto=format&fit=crop&q=80&w=256',
    assignedDivision: 'Dhaka',
    assignedDistrict: 'Dhaka',
    assignedUpazila: 'Gulshan',
    status: 'ACTIVE',
    issueDate: '2025-06-01',
    expiryDate: '2028-06-01',
    donationCount: 6,
    qrPayload: 'https://bloodconnection.org.bd/verify/bc-token-donor2',
  }
];

// ACTIVE BLOOD REQUESTS IN MAJOR BANGLADESH HOSPITALS
export const SEED_REQUESTS: BloodRequest[] = [
  {
    id: 'req-1',
    patientName: 'Mrs. Rokeya Begum',
    bloodGroup: 'O+',
    requiredUnits: 3,
    fulfilledUnits: 2,
    hospitalName: 'Dhaka Medical College Hospital (DMCH)',
    hospitalAddress: 'Secretariat Rd, Shahbagh, Dhaka 1000',
    divisionId: 'dhaka',
    districtId: 'dhaka',
    upazilaId: 'shahbagh',
    requiredDate: '2026-11-04',
    requiredTime: '15:00',
    contactPerson: 'Ziaul Hoque (Son)',
    contactPhone: '+8801712984512',
    urgency: 'CRITICAL',
    additionalNotes: 'Emergency cardiac surgery scheduled tomorrow morning. 1 more unit needed urgently.',
    status: 'MATCHING',
    createdById: 'user-visitor',
    createdAt: '2026-11-03T08:30:00Z',
    matchedDonorsCount: 4,
  },
  {
    id: 'req-2',
    patientName: 'Master Tanvir Hossain (8 yrs)',
    bloodGroup: 'B+',
    requiredUnits: 2,
    fulfilledUnits: 1,
    hospitalName: 'Square Hospital Limited',
    hospitalAddress: '18/F Bir Uttam Qazi Nuruzzaman Sarak, West Panthapath, Dhaka',
    divisionId: 'dhaka',
    districtId: 'dhaka',
    upazilaId: 'dhanmondi',
    requiredDate: '2026-11-04',
    requiredTime: '11:00',
    contactPerson: 'Adv. Mozammel Hossain',
    contactPhone: '+8801819772211',
    urgency: 'CRITICAL',
    additionalNotes: 'Thalassemia patient requiring regular monthly transfusion.',
    status: 'MATCHING',
    createdById: 'user-visitor',
    createdAt: '2026-11-03T09:15:00Z',
    matchedDonorsCount: 6,
  },
  {
    id: 'req-3',
    patientName: 'Kamal Uddin Majumder',
    bloodGroup: 'A+',
    requiredUnits: 2,
    fulfilledUnits: 0,
    hospitalName: 'Chittagong Medical College Hospital',
    hospitalAddress: '57 K.B. Fazlul Kader Rd, Panchlaish, Chattogram',
    divisionId: 'chattogram',
    districtId: 'chattogram',
    upazilaId: 'panchlaish',
    requiredDate: '2026-11-05',
    requiredTime: '14:00',
    contactPerson: 'Sultan Ahmed (Brother)',
    contactPhone: '+8801812345678',
    urgency: 'URGENT',
    additionalNotes: 'Orthopedic joint replacement surgery. Platelets & Whole blood needed.',
    status: 'APPROVED',
    createdById: 'user-visitor',
    createdAt: '2026-11-02T16:00:00Z',
    matchedDonorsCount: 8,
  },
  {
    id: 'req-4',
    patientName: 'Suraiya Parveen',
    bloodGroup: 'O-',
    requiredUnits: 2,
    fulfilledUnits: 2,
    hospitalName: 'Evercare Hospital Dhaka',
    hospitalAddress: 'Plot 81, Block E, Bashundhara R/A, Dhaka',
    divisionId: 'dhaka',
    districtId: 'dhaka',
    upazilaId: 'badda',
    requiredDate: '2026-11-02',
    requiredTime: '10:00',
    contactPerson: 'Dr. Nabil Rahman',
    contactPhone: '+8801715667788',
    urgency: 'CRITICAL',
    additionalNotes: 'Rare blood group required for emergency obstetric delivery.',
    status: 'FULFILLED',
    createdById: 'user-visitor',
    createdAt: '2026-11-01T12:00:00Z',
    matchedDonorsCount: 3,
  },
  {
    id: 'req-5',
    patientName: 'Md. Abdul Mannan',
    bloodGroup: 'AB-',
    requiredUnits: 1,
    fulfilledUnits: 0,
    hospitalName: 'Sylhet MAG Osmani Medical College Hospital',
    hospitalAddress: 'Kajalshah, Sylhet 3100',
    divisionId: 'sylhet',
    districtId: 'sylhet',
    upazilaId: 'sylhet-sadar',
    requiredDate: '2026-11-06',
    requiredTime: '09:00',
    contactPerson: 'Salim Ullah (Nephew)',
    contactPhone: '+8801718991122',
    urgency: 'URGENT',
    additionalNotes: 'Extremely rare AB- needed for post-dialysis support.',
    status: 'APPROVED',
    createdById: 'user-visitor',
    createdAt: '2026-11-03T11:00:00Z',
    matchedDonorsCount: 2,
  }
];

// ORGANIZATIONS IN BANGLADESH
export const SEED_ORGANIZATIONS: Organization[] = [
  {
    id: 'org-redcrescent',
    name: 'Bangladesh Red Crescent Society (BDRCS)',
    bnName: 'বাংলাদেশ রেড ক্রিসেন্ট সোসাইটি',
    type: 'GOVERNMENT',
    registrationNo: 'BDRCS-NAT-1971-001',
    logoUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=256',
    divisionId: 'dhaka',
    districtId: 'dhaka',
    upazilaId: 'shahbagh',
    address: '684-686 Bara Moghbazar, Dhaka 1217',
    contactEmail: 'bloodbank@bdrcs.org',
    contactPhone: '+88029330188',
    website: 'https://bdrcs.org',
    adminId: 'user-admin',
    adminName: 'Nusrat Jahan Tanha',
    memberCount: 4200,
    totalDonationsOrganized: 84500,
    isVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'org-sandhani',
    name: 'Sandhani National Blood Donation Club',
    bnName: 'সন্ধানী জাতীয় রক্তদান সংস্থা (ডিএমসি ইউনিট)',
    type: 'CLUB',
    registrationNo: 'SND-DMC-1977-012',
    logoUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=256',
    divisionId: 'dhaka',
    districtId: 'dhaka',
    upazilaId: 'shahbagh',
    address: 'Dhaka Medical College Campus, Dhaka',
    contactEmail: 'info@sandhanidmc.org',
    contactPhone: '+8801711234567',
    adminId: 'user-orgadmin',
    adminName: 'Dr. Ahsan Habib',
    memberCount: 1850,
    totalDonationsOrganized: 62000,
    isVerified: true,
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'org-badhan',
    name: 'Badhan (A Voluntary Blood Donors\' Organization)',
    bnName: 'বাঁধন (স্বেচ্ছায় রক্তদাতাদের সংগঠন)',
    type: 'UNIVERSITY',
    registrationNo: 'BDN-DU-1997-048',
    logoUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=256',
    divisionId: 'dhaka',
    districtId: 'dhaka',
    upazilaId: 'shahbagh',
    address: 'TSC, University of Dhaka, Dhaka 1000',
    contactEmail: 'central@badhan.org',
    contactPhone: '+8801711998877',
    adminId: 'user-admin',
    adminName: 'Tanvir Hossain',
    memberCount: 3100,
    totalDonationsOrganized: 75200,
    isVerified: true,
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'org-quantum',
    name: 'Quantum Foundation Blood Lab & Donor Pool',
    bnName: 'কোয়ান্টাম ফাউন্ডেশন ল্যাব ও রক্তদাতা পুল',
    type: 'FOUNDATION',
    registrationNo: 'QNT-LAB-2000-089',
    logoUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=256',
    divisionId: 'dhaka',
    districtId: 'dhaka',
    upazilaId: 'motijheel',
    address: '31/V Shilpacharya Zainul Abedin Sarak, Shantinagar, Dhaka',
    contactEmail: 'blood@quantummethod.org.bd',
    contactPhone: '+8801714010869',
    adminId: 'user-admin',
    adminName: 'Rezaul Karim',
    memberCount: 2600,
    totalDonationsOrganized: 54000,
    isVerified: true,
    createdAt: '2024-02-15T00:00:00Z',
  }
];

// DONATION CAMPAIGNS
export const SEED_CAMPAIGNS: DonationCampaign[] = [
  {
    id: 'camp-1',
    organizationId: 'org-redcrescent',
    organizationName: 'Bangladesh Red Crescent Society',
    title: 'National Blood Donation Drive 2026 — Dhaka University TSC',
    bnTitle: 'জাতীয় রক্তদান কর্মসূচি ২০২৬ — ঢাকা বিশ্ববিদ্যালয় টিএসসি',
    description: 'Join thousands of voluntary donors in our grand university drive. Refreshments, free diagnostic blood group tests and official Digital ID cards will be issued on the spot.',
    venue: 'TSC Premises, Dhaka University, Shahbagh, Dhaka',
    divisionId: 'dhaka',
    districtId: 'dhaka',
    upazilaId: 'shahbagh',
    startDate: '2026-11-10T09:00:00Z',
    endDate: '2026-11-12T18:00:00Z',
    targetUnits: 500,
    collectedUnits: 340,
    status: 'UPCOMING',
    coordinatorPhone: '+8801711000003',
  },
  {
    id: 'camp-2',
    organizationId: 'org-sandhani',
    organizationName: 'Sandhani DMC Unit',
    title: 'World Blood Donor Day Special Camp — CMCH Chattogram',
    bnTitle: 'বিশ্ব রক্তদাতা দিবস বিশেষ ক্যাম্প — চমেক হাসপাতাল চট্টগ্রাম',
    description: 'A 2-day special blood donation and thalassemia awareness drive at Chittagong Medical College Hospital auditorium.',
    venue: 'Auditorium Hall, Chittagong Medical College Hospital',
    divisionId: 'chattogram',
    districtId: 'chattogram',
    upazilaId: 'panchlaish',
    startDate: '2026-11-15T10:00:00Z',
    endDate: '2026-11-16T17:00:00Z',
    targetUnits: 300,
    collectedUnits: 180,
    status: 'UPCOMING',
    coordinatorPhone: '+8801711000004',
  }
];

// DONOR REVIEWS & RATINGS
export const SEED_REVIEWS: DonorReview[] = [
  {
    id: 'rev-1',
    donorId: 'donor-1',
    reviewerId: 'user-visitor',
    reviewerName: 'Farhana Chowdhury',
    reviewerRole: 'Recipient Guardian',
    rating: 5,
    feedback: 'Tariqul bhai arrived at Square Hospital within 45 minutes of our emergency call at midnight. He saved my mother’s life. Immense respect!',
    isVerifiedInteraction: true,
    createdAt: '2025-11-21T04:20:00Z',
  },
  {
    id: 'rev-2',
    donorId: 'donor-1',
    reviewerId: 'user-upzcoord',
    reviewerName: 'Shaila Sharmin (Coordinator)',
    reviewerRole: 'Thana Coordinator',
    rating: 5,
    feedback: 'One of the most dependable O+ voluntary donors in Dhanmondi. Extremely polite, prompt, and medically verified.',
    isVerifiedInteraction: true,
    createdAt: '2025-11-22T10:00:00Z',
  },
  {
    id: 'rev-3',
    donorId: 'donor-3',
    reviewerId: 'user-distcoord',
    reviewerName: 'Kazi Tanvir Ahmed',
    reviewerRole: 'District Coordinator',
    rating: 5,
    feedback: 'Donated 1 unit of B+ blood for a child undergoing thalassemia treatment at CMCH. Highly recommended!',
    isVerifiedInteraction: true,
    createdAt: '2025-10-16T14:30:00Z',
  }
];

// DONOR VERIFIED CERTIFICATES
export const SEED_CERTIFICATES: DonationCertificate[] = [
  {
    id: 'cert-1',
    certificateNumber: 'BC-CERT-2025-09812',
    donorId: 'user-donor-primary',
    donorName: 'Tariqul Islam Roni',
    bloodGroup: 'O+',
    unitsDonated: 1,
    hospitalOrEvent: 'Square Hospital Cardiac Center',
    issueDate: '2025-11-20',
    issuedBy: 'Directorate General of Health Services (DGHS) & Blood Connection',
    verificationToken: 'bc-cert-token-09812',
  }
];

// NOTIFICATIONS
export const SEED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'user-donor-primary',
    title: 'Eligibility Update',
    message: 'Your 3-month cooldown from your last verified donation has elapsed. Your status is now AVAILABLE.',
    type: 'AVAILABILITY',
    read: false,
    linkUrl: '/dashboard',
    createdAt: '2026-02-21T00:00:00Z',
  },
  {
    id: 'notif-2',
    userId: 'user-donor-primary',
    title: 'Emergency Match Nearby!',
    message: 'A critical O+ blood request has been posted at Dhaka Medical College Hospital (Shahbagh).',
    type: 'REQUEST',
    read: false,
    linkUrl: '/requests/req-1',
    createdAt: '2026-11-03T08:35:00Z',
  }
];

// AUDIT LOGS
export const SEED_AUDIT_LOGS: SystemAuditLog[] = [
  {
    id: 'log-1',
    actorId: 'user-superadmin',
    actorName: 'Dr. Rafiqul Islam Chowdhury',
    actorRole: 'SUPER_ADMIN',
    action: 'SYSTEM_PARAM_UPDATE',
    entityType: 'SystemSettings',
    entityId: 'availability_cooldown_months',
    timestamp: '2026-11-01T10:00:00Z',
    details: 'Verified national 3-month automated cooldown rule enforced across all divisions.',
  },
  {
    id: 'log-2',
    actorId: 'user-distcoord',
    actorName: 'Kazi Tanvir Ahmed',
    actorRole: 'DISTRICT_COORDINATOR',
    action: 'DONATION_VERIFIED',
    entityType: 'Donation',
    entityId: 'don-chatt-09',
    timestamp: '2026-11-02T16:45:00Z',
    details: 'Verified 1 unit B+ blood donation at CMCH. Cooldown triggered automatically.',
  }
];

// In-memory fallback if localStorage is undefined (e.g. Node CLI / testing environment)
const memoryStorage: Record<string, string> = {};

const getStorageItem = (key: string): string | null => {
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return memoryStorage[key] || null;
};

const setStorageItem = (key: string, value: string) => {
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    window.localStorage.setItem(key, value);
  } else {
    memoryStorage[key] = value;
  }
};

// STORE HELPER CLASS TO HANDLE STATE, LOCAL STORAGE PERSISTENCE, AND SIMULATE SUPABASE
class BloodConnectionStore {
  private profiles: UserProfile[] = [];
  private donors: DonorProfile[] = [];
  private idCards: DigitalIdCard[] = [];
  private requests: BloodRequest[] = [];
  private reviews: DonorReview[] = [];
  private organizations: Organization[] = [];
  private campaigns: DonationCampaign[] = [];
  private certificates: DonationCertificate[] = [];
  private auditLogs: SystemAuditLog[] = [];
  private notifications: NotificationItem[] = [];
  private currentUser: UserProfile | null = null;

  constructor() {
    this.init();
  }

  private init() {
    // Load or seed
    const storedProfiles = getStorageItem(STORAGE_KEYS.PROFILES);
    if (!storedProfiles) {
      this.profiles = [...SEED_PROFILES, ...ADDITIONAL_DONOR_USERS];
      this.donors = [...SEED_DONORS];
      this.idCards = [...SEED_ID_CARDS];
      this.requests = [...SEED_REQUESTS];
      this.reviews = [...SEED_REVIEWS];
      this.organizations = [...SEED_ORGANIZATIONS];
      this.campaigns = [...SEED_CAMPAIGNS];
      this.certificates = [...SEED_CERTIFICATES];
      this.auditLogs = [...SEED_AUDIT_LOGS];
      this.notifications = [...SEED_NOTIFICATIONS];
      this.currentUser = this.profiles[0]; // Default to Super Admin for complete inspection
      this.persist();
    } else {
      try {
        this.profiles = JSON.parse(storedProfiles);
        this.donors = JSON.parse(getStorageItem(STORAGE_KEYS.DONORS) || '[]');
        this.idCards = JSON.parse(getStorageItem(STORAGE_KEYS.ID_CARDS) || '[]');
        this.requests = JSON.parse(getStorageItem(STORAGE_KEYS.REQUESTS) || '[]');
        this.reviews = JSON.parse(getStorageItem(STORAGE_KEYS.REVIEWS) || '[]');
        this.organizations = JSON.parse(getStorageItem(STORAGE_KEYS.ORGANIZATIONS) || '[]');
        this.campaigns = JSON.parse(getStorageItem(STORAGE_KEYS.CAMPAIGNS) || '[]');
        this.certificates = JSON.parse(getStorageItem(STORAGE_KEYS.CERTIFICATES) || '[]');
        this.auditLogs = JSON.parse(getStorageItem(STORAGE_KEYS.AUDIT_LOGS) || '[]');
        this.notifications = JSON.parse(getStorageItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
        const cur = getStorageItem(STORAGE_KEYS.CURRENT_USER);
        this.currentUser = cur ? JSON.parse(cur) : this.profiles[0];
      } catch (e) {
        console.error('Failed to parse stored state, resetting to seed data', e);
        this.resetToSeed();
      }
    }
  }

  private persist() {
    setStorageItem(STORAGE_KEYS.PROFILES, JSON.stringify(this.profiles));
    setStorageItem(STORAGE_KEYS.DONORS, JSON.stringify(this.donors));
    setStorageItem(STORAGE_KEYS.ID_CARDS, JSON.stringify(this.idCards));
    setStorageItem(STORAGE_KEYS.REQUESTS, JSON.stringify(this.requests));
    setStorageItem(STORAGE_KEYS.REVIEWS, JSON.stringify(this.reviews));
    setStorageItem(STORAGE_KEYS.ORGANIZATIONS, JSON.stringify(this.organizations));
    setStorageItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(this.campaigns));
    setStorageItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(this.certificates));
    setStorageItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(this.auditLogs));
    setStorageItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(this.notifications));
    if (this.currentUser) {
      setStorageItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(this.currentUser));
    }
  }

  public resetToSeed() {
    this.profiles = [...SEED_PROFILES, ...ADDITIONAL_DONOR_USERS];
    this.donors = [...SEED_DONORS];
    this.idCards = [...SEED_ID_CARDS];
    this.requests = [...SEED_REQUESTS];
    this.reviews = [...SEED_REVIEWS];
    this.organizations = [...SEED_ORGANIZATIONS];
    this.campaigns = [...SEED_CAMPAIGNS];
    this.certificates = [...SEED_CERTIFICATES];
    this.auditLogs = [...SEED_AUDIT_LOGS];
    this.notifications = [...SEED_NOTIFICATIONS];
    this.currentUser = this.profiles[0];
    this.persist();
  }

  // CURRENT USER & ROLE SWITCHING (FOR TESTING ALL 9 ROLES)
  public getCurrentUser(): UserProfile | null {
    return this.currentUser;
  }

  public switchRole(role: UserRole): UserProfile {
    const found = this.profiles.find((p) => p.role === role);
    if (found) {
      this.currentUser = found;
      this.persist();
      return found;
    }
    // If visitor
    if (role === 'VISITOR') {
      const visitor = this.profiles.find((p) => p.role === 'VISITOR');
      if (visitor) {
        this.currentUser = visitor;
        this.persist();
        return visitor;
      }
    }
    return this.profiles[0];
  }

  public setCurrentUser(user: UserProfile) {
    this.currentUser = user;
    this.persist();
  }

  // PROFILES
  public getProfiles(): UserProfile[] {
    return this.profiles;
  }

  public getProfileById(id: string): UserProfile | undefined {
    return this.profiles.find((p) => p.id === id);
  }

  // DONORS
  public getDonors(): (DonorProfile & { profile: UserProfile })[] {
    return this.donors
      .map((donor) => {
        const profile = this.profiles.find((p) => p.id === donor.userId);
        if (!profile) return null;
        return { ...donor, profile };
      })
      .filter(Boolean) as (DonorProfile & { profile: UserProfile })[];
  }

  public getDonorByUserId(userId: string): (DonorProfile & { profile: UserProfile }) | undefined {
    const donor = this.donors.find((d) => d.userId === userId);
    if (!donor) return undefined;
    const profile = this.profiles.find((p) => p.id === userId);
    if (!profile) return undefined;
    return { ...donor, profile };
  }

  public getDonorById(id: string): (DonorProfile & { profile: UserProfile }) | undefined {
    const donor = this.donors.find((d) => d.id === id);
    if (!donor) return undefined;
    const profile = this.profiles.find((p) => p.id === donor.userId);
    if (!profile) return undefined;
    return { ...donor, profile };
  }

  // AUTOMATED DONOR AVAILABILITY (3-MONTH ENGINE)
  public recordDonationAndUpdateAvailability(
    donorId: string,
    hospitalName: string,
    units: number = 1,
    verifierId: string
  ) {
    const donor = this.donors.find((d) => d.id === donorId);
    if (!donor) return false;

    const today = new Date().toISOString().split('T')[0];
    const eligibleDate = new Date();
    eligibleDate.setMonth(eligibleDate.getMonth() + 3);
    const nextEligibleStr = eligibleDate.toISOString().split('T')[0];

    // Update donor state
    donor.lastDonationDate = today;
    donor.nextEligibleDate = nextEligibleStr;
    donor.availabilityStatus = 'UNAVAILABLE_TEMPORARY';
    donor.verifiedDonationsCount += 1;
    donor.totalUnitsDonated += units;

    // Generate Certificate
    const certNum = `BC-CERT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const donorProfile = this.profiles.find((p) => p.id === donor.userId);
    const newCert: DonationCertificate = {
      id: `cert-${Date.now()}`,
      certificateNumber: certNum,
      donorId: donor.userId,
      donorName: donorProfile ? donorProfile.fullName : 'Voluntary Donor',
      bloodGroup: donor.bloodGroup,
      unitsDonated: units,
      hospitalOrEvent: hospitalName,
      issueDate: today,
      issuedBy: 'Directorate General of Health Services (DGHS) & Blood Connection',
      verificationToken: `token-${certNum}`,
    };
    this.certificates.unshift(newCert);

    // Add audit log
    this.auditLogs.unshift({
      id: `log-${Date.now()}`,
      actorId: verifierId,
      actorName: 'Authorized Coordinator',
      actorRole: 'DISTRICT_COORDINATOR',
      action: 'DONATION_VERIFIED_3MO_COOLDOWN',
      entityType: 'DonorProfile',
      entityId: donor.id,
      timestamp: new Date().toISOString(),
      details: `Donation verified at ${hospitalName}. 3-Month cooldown initiated until ${nextEligibleStr}.`,
    });

    this.persist();
    return true;
  }

  // MANUAL TOGGLE OF AVAILABILITY (subject to 3-month medical warning)
  public updateDonorAvailabilityStatus(
    donorId: string,
    newStatus: 'AVAILABLE' | 'UNAVAILABLE_TEMPORARY' | 'UNAVAILABLE_PERMANENT'
  ) {
    const donor = this.donors.find((d) => d.id === donorId);
    if (!donor) return false;
    donor.availabilityStatus = newStatus;
    this.persist();
    return true;
  }

  // DIGITAL ID CARDS & QR VERIFICATION
  public getIdCards(): DigitalIdCard[] {
    return this.idCards;
  }

  public getIdCardByUserId(userId: string): DigitalIdCard | undefined {
    return this.idCards.find((id) => id.userId === userId);
  }

  public getIdCardByToken(token: string): (DigitalIdCard & { profile?: UserProfile; donor?: DonorProfile }) | undefined {
    if (!token) return undefined;
    const cleanToken = token.trim().toLowerCase();
    const card = this.idCards.find(
      (c) =>
        (c.verificationToken && c.verificationToken.toLowerCase() === cleanToken) ||
        (c.idNumber && c.idNumber.toLowerCase() === cleanToken)
    );
    if (!card) return undefined;
    const profile = this.profiles.find((p) => p.id === card.userId);
    const donor = this.donors.find((d) => d.userId === card.userId);
    return { ...card, profile, donor };
  }

  public saveIdCard(card: DigitalIdCard): void {
    const existingIndex = this.idCards.findIndex(
      (c) =>
        (c.verificationToken && c.verificationToken.toLowerCase() === card.verificationToken.toLowerCase()) ||
        (c.idNumber && c.idNumber.toLowerCase() === card.idNumber.toLowerCase())
    );
    if (existingIndex >= 0) {
      this.idCards[existingIndex] = { ...this.idCards[existingIndex], ...card };
    } else {
      this.idCards.unshift(card);
    }
    this.persist();
  }

  public generateIdCardForUser(profile: UserProfile, bloodGroup?: BloodGroup): DigitalIdCard {
    const rolePrefixes: Record<UserRole, string> = {
      SUPER_ADMIN: 'BC-SAD',
      ADMIN: 'BC-ADM',
      DIVISION_ADMIN: 'BC-DIV',
      DISTRICT_COORDINATOR: 'BC-DIS',
      UPAZILA_COORDINATOR: 'BC-UPZ',
      ORGANIZATION_ADMIN: 'BC-ORG',
      VOLUNTEER: 'BC-VOL',
      DONOR: 'BC-DON',
      VISITOR: 'BC-CIT',
    };

    const prefix = rolePrefixes[profile.role] || 'BC-DON';
    const serial = Math.floor(10000 + Math.random() * 90000);
    const year = new Date().getFullYear();
    const idNumber = `${prefix}-${year}-${serial}`;
    const token = `bc-token-${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36)}`;

    const newCard: DigitalIdCard = {
      id: `id-${Date.now()}`,
      userId: profile.id,
      role: profile.role,
      idNumber,
      verificationToken: token,
      fullName: profile.fullName,
      bloodGroup: bloodGroup || 'O+',
      avatarUrl: profile.avatarUrl,
      assignedDivision: profile.divisionId,
      assignedDistrict: profile.districtId,
      assignedUpazila: profile.upazilaId,
      organizationName: profile.organizationName,
      status: 'ACTIVE',
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(new Date().setFullYear(year + 3)).toISOString().split('T')[0],
      donationCount: 0,
      qrPayload: `https://bloodconnection.org.bd/verify/${token}`,
    };

    // Remove existing if any
    this.idCards = this.idCards.filter((c) => c.userId !== profile.id);
    this.idCards.push(newCard);
    this.persist();
    return newCard;
  }

  // BLOOD REQUESTS
  public getRequests(): BloodRequest[] {
    return this.requests;
  }

  public getRequestById(id: string): BloodRequest | undefined {
    return this.requests.find((r) => r.id === id);
  }

  public createRequest(data: Omit<BloodRequest, 'id' | 'createdAt' | 'fulfilledUnits' | 'status'>): BloodRequest {
    const newReq: BloodRequest = {
      ...data,
      id: `req-${Date.now()}`,
      fulfilledUnits: 0,
      status: 'MATCHING',
      createdAt: new Date().toISOString(),
      matchedDonorsCount: this.getMatchingDonors(data.bloodGroup, data.districtId).length,
    };
    this.requests.unshift(newReq);
    this.persist();
    return newReq;
  }

  public updateRequestStatus(id: string, status: BloodRequest['status']) {
    const req = this.requests.find((r) => r.id === id);
    if (!req) return false;
    req.status = status;
    this.persist();
    return true;
  }

  public getMatchingDonors(bloodGroup: BloodGroup, districtId?: string) {
    return this.getDonors().filter((d) => {
      // Blood compatibility
      const isCompat = this.isCompatibleBlood(d.bloodGroup, bloodGroup);
      const isAvailable = d.availabilityStatus === 'AVAILABLE';
      const districtMatch = !districtId || d.profile.districtId === districtId;
      return isCompat && isAvailable && districtMatch;
    });
  }

  private isCompatibleBlood(donor: BloodGroup, recipient: BloodGroup): boolean {
    if (donor === recipient) return true;
    if (donor === 'O-') return true; // Universal donor
    if (donor === 'O+' && recipient.endsWith('+')) return true;
    if (donor === 'A-' && (recipient === 'A+' || recipient === 'AB+' || recipient === 'AB-')) return true;
    if (donor === 'A+' && (recipient === 'A+' || recipient === 'AB+')) return true;
    if (donor === 'B-' && (recipient === 'B+' || recipient === 'AB+' || recipient === 'AB-')) return true;
    if (donor === 'B+' && (recipient === 'B+' || recipient === 'AB+')) return true;
    if (donor === 'AB-' && (recipient === 'AB+' || recipient === 'AB-')) return true;
    if (donor === 'AB+' && recipient === 'AB+') return true;
    return false;
  }

  // ORGANIZATIONS & CAMPAIGNS
  public getOrganizations(): Organization[] {
    return this.organizations;
  }

  public getCampaigns(): DonationCampaign[] {
    return this.campaigns;
  }

  // REVIEWS
  public getReviews(): DonorReview[] {
    return this.reviews;
  }

  public getReviewsByDonorId(donorId: string): DonorReview[] {
    return this.reviews.filter((r) => r.donorId === donorId);
  }

  public addReview(review: Omit<DonorReview, 'id' | 'createdAt'>): DonorReview {
    const newRev: DonorReview = {
      ...review,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.reviews.unshift(newRev);

    // Recalculate donor rating
    const donor = this.donors.find((d) => d.id === review.donorId);
    if (donor) {
      const donorReviews = this.reviews.filter((r) => r.donorId === review.donorId);
      const sum = donorReviews.reduce((acc, curr) => acc + curr.rating, 0);
      donor.averageRating = Number((sum / donorReviews.length).toFixed(2));
      donor.reviewsCount = donorReviews.length;
    }

    this.persist();
    return newRev;
  }

  // CERTIFICATES
  public getCertificates(): DonationCertificate[] {
    return this.certificates;
  }

  public getCertificatesByUserId(userId: string): DonationCertificate[] {
    return this.certificates.filter((c) => c.donorId === userId);
  }

  // AUDIT LOGS
  public getAuditLogs(): SystemAuditLog[] {
    return this.auditLogs;
  }

  // NOTIFICATIONS
  public getNotifications(userId?: string): NotificationItem[] {
    if (!userId) return this.notifications;
    return this.notifications.filter((n) => n.userId === userId || !n.userId);
  }

  public markNotificationAsRead(id: string) {
    const notif = this.notifications.find((n) => n.id === id);
    if (notif) {
      notif.read = true;
      this.persist();
    }
  }

  // COMPLETE DONOR REGISTRATION WORKFLOW
  public registerDonor(data: {
    fullName: string;
    email: string;
    phone: string;
    bloodGroup: BloodGroup;
    rhFactor: '+' | '-';
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    divisionId: string;
    districtId: string;
    upazilaId?: string;
    address?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    preferredContactMethod?: 'phone' | 'whatsapp' | 'email' | 'in_app';
    avatarUrl?: string;
  }): { user: UserProfile; donor: DonorProfile; idCard: DigitalIdCard } {
    const userId = `user-${Date.now()}`;
    const donorId = `donor-${Date.now()}`;

    const newProfile: UserProfile = {
      id: userId,
      email: data.email,
      fullName: data.fullName,
      role: 'DONOR',
      phone: data.phone,
      avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256',
      divisionId: data.divisionId,
      districtId: data.districtId,
      upazilaId: data.upazilaId,
      address: data.address,
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newDonor: DonorProfile = {
      id: donorId,
      userId: userId,
      bloodGroup: data.bloodGroup,
      rhFactor: data.rhFactor,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      lastDonationDate: null,
      nextEligibleDate: null,
      availabilityStatus: 'AVAILABLE',
      manualAvailabilityOptIn: true,
      verifiedDonationsCount: 0,
      totalUnitsDonated: 0,
      averageRating: 5.0,
      reviewsCount: 0,
      emergencyContactName: data.emergencyContactName,
      emergencyContactPhone: data.emergencyContactPhone,
      preferredContactMethod: data.preferredContactMethod || 'phone',
      isAvailableForEmergency: true,
      medicalClearanceWarningAccepted: true,
      badges: [
        {
          id: `badge-${Date.now()}`,
          name: 'Registered Voluntary Donor',
          bnName: 'নিবন্ধিত স্বেচ্ছাসেবী রক্তদাতা',
          description: 'Official verified donor member of Blood Connection Bangladesh',
          icon: 'Shield',
          earnedDate: new Date().toISOString().split('T')[0],
        },
      ],
    };

    this.profiles.unshift(newProfile);
    this.donors.unshift(newDonor);

    // Auto-generate Digital ID Card
    const idCard = this.generateIdCardForUser(newProfile, data.bloodGroup);

    // Log registration
    this.auditLogs.unshift({
      id: `log-${Date.now()}`,
      actorId: userId,
      actorName: data.fullName,
      actorRole: 'DONOR',
      action: 'DONOR_REGISTRATION',
      entityType: 'DonorProfile',
      entityId: donorId,
      timestamp: new Date().toISOString(),
      details: `New voluntary donor registered: ${data.fullName} (${data.bloodGroup}) in ${data.districtId}`,
    });

    // Welcome Notification
    this.notifications.unshift({
      id: `notif-${Date.now()}`,
      userId: userId,
      title: 'Welcome to Blood Connection!',
      message: 'Your Digital Donor ID Card has been generated. You are ready to save lives.',
      type: 'ID_CARD',
      read: false,
      linkUrl: '/dashboard',
      createdAt: new Date().toISOString(),
    });

    this.currentUser = newProfile;
    this.persist();

    return { user: newProfile, donor: newDonor, idCard };
  }
}

export const bloodConnectionStore = new BloodConnectionStore();
