export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'DIVISION_ADMIN'
  | 'DISTRICT_COORDINATOR'
  | 'UPAZILA_COORDINATOR'
  | 'ORGANIZATION_ADMIN'
  | 'VOLUNTEER'
  | 'DONOR'
  | 'VISITOR';

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type DonorAvailabilityStatus =
  | 'AVAILABLE'
  | 'UNAVAILABLE_TEMPORARY' // Within 3-month window
  | 'UNAVAILABLE_PERMANENT'
  | 'PENDING_RECHECK';

export type IdCardStatus = 'ACTIVE' | 'SUSPENDED' | 'EXPIRED' | 'REVOKED' | 'PENDING';

export type RequestUrgency = 'CRITICAL' | 'URGENT' | 'NORMAL';

export type BloodRequestStatus =
  | 'PENDING'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'MATCHING'
  | 'PARTIALLY_FULFILLED'
  | 'FULFILLED'
  | 'REJECTED'
  | 'CANCELLED'
  | 'EXPIRED';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  bnName?: string;
  role: UserRole;
  phone: string;
  avatarUrl: string;
  divisionId: string;
  districtId: string;
  upazilaId?: string;
  address?: string;
  organizationId?: string;
  organizationName?: string;
  assignedJurisdiction?: string; // For coordinators
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DonorProfile {
  id: string;
  userId: string;
  bloodGroup: BloodGroup;
  rhFactor: '+' | '-';
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  lastDonationDate: string | null;
  nextEligibleDate: string | null; // Automatically calculated 3-month rule
  availabilityStatus: DonorAvailabilityStatus;
  manualAvailabilityOptIn: boolean;
  verifiedDonationsCount: number;
  totalUnitsDonated: number;
  averageRating: number;
  reviewsCount: number;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  preferredContactMethod: 'phone' | 'whatsapp' | 'email' | 'in_app';
  isAvailableForEmergency: boolean;
  medicalClearanceWarningAccepted: boolean;
  badges: DonorBadge[];
}

export interface DonorBadge {
  id: string;
  name: string;
  bnName: string;
  description: string;
  icon: string;
  earnedDate: string;
}

export interface DigitalIdCard {
  id: string;
  userId: string;
  role: UserRole;
  idNumber: string; // e.g. "BC-DON-2026-9812", "BC-ADM-2026-0041"
  verificationToken: string; // Used in /verify/:token
  fullName: string;
  bloodGroup?: BloodGroup;
  avatarUrl: string;
  assignedDivision?: string;
  assignedDistrict?: string;
  assignedUpazila?: string;
  organizationName?: string;
  status: IdCardStatus;
  issueDate: string;
  expiryDate?: string;
  donationCount?: number;
  qrPayload: string;
}

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: BloodGroup;
  requiredUnits: number;
  fulfilledUnits: number;
  hospitalName: string;
  hospitalAddress: string;
  divisionId: string;
  districtId: string;
  upazilaId: string;
  requiredDate: string;
  requiredTime: string;
  contactPerson: string;
  contactPhone: string;
  urgency: RequestUrgency;
  additionalNotes?: string;
  status: BloodRequestStatus;
  createdById: string;
  createdAt: string;
  matchedDonorsCount?: number;
  verifiedByCoordinatorId?: string;
}

export interface BloodRequestResponse {
  id: string;
  requestId: string;
  donorId: string;
  donorName: string;
  donorPhone: string;
  donorBloodGroup: BloodGroup;
  status: 'ACCEPTED' | 'DECLINED' | 'COMPLETED' | 'CANCELLED';
  message?: string;
  createdAt: string;
}

export interface DonationRecord {
  id: string;
  donorId: string;
  donorName: string;
  bloodGroup: BloodGroup;
  requestId?: string;
  hospitalName: string;
  districtId: string;
  units: number;
  donationDate: string;
  verifiedBy: string; // Coordinator ID or Hospital Rep
  verifierRole: UserRole;
  verificationNotes?: string;
  certificateNumber: string;
  createdAt: string;
}

export interface DonorReview {
  id: string;
  donorId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerRole: string;
  rating: number; // 1 - 5
  feedback: string;
  isVerifiedInteraction: boolean;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  bnName?: string;
  type: 'CLUB' | 'FOUNDATION' | 'HOSPITAL' | 'UNIVERSITY' | 'GOVERNMENT';
  registrationNo: string;
  logoUrl: string;
  divisionId: string;
  districtId: string;
  upazilaId?: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  adminId: string;
  adminName: string;
  memberCount: number;
  totalDonationsOrganized: number;
  isVerified: boolean;
  createdAt: string;
}

export interface DonationCampaign {
  id: string;
  organizationId: string;
  organizationName: string;
  title: string;
  bnTitle?: string;
  description: string;
  venue: string;
  divisionId: string;
  districtId: string;
  upazilaId: string;
  startDate: string;
  endDate: string;
  targetUnits: number;
  collectedUnits: number;
  bannerUrl?: string;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  coordinatorPhone: string;
}

export interface DonationCertificate {
  id: string;
  certificateNumber: string;
  donorId: string;
  donorName: string;
  bloodGroup: BloodGroup;
  unitsDonated: number;
  hospitalOrEvent: string;
  issueDate: string;
  issuedBy: string;
  verificationToken: string;
}

export interface SystemAuditLog {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  entityType: string;
  entityId: string;
  timestamp: string;
  details: string;
  ipAddress?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'REQUEST' | 'DONATION' | 'ID_CARD' | 'AVAILABILITY' | 'SYSTEM';
  read: boolean;
  linkUrl?: string;
  createdAt: string;
}
