import { describe, it, expect, beforeEach } from 'vitest';
import { bloodConnectionStore } from '../services/store';

describe('Roles, Registration & Reviews (PART 03, PART 06, PART 11)', () => {
  beforeEach(() => {
    bloodConnectionStore.resetToSeed();
  });

  it('should support switching between all 9 roles', () => {
    const roles = [
      'SUPER_ADMIN',
      'ADMIN',
      'DIVISION_ADMIN',
      'DISTRICT_COORDINATOR',
      'UPAZILA_COORDINATOR',
      'ORGANIZATION_ADMIN',
      'VOLUNTEER',
      'DONOR',
      'VISITOR',
    ] as const;

    roles.forEach((r) => {
      const switched = bloodConnectionStore.switchRole(r);
      expect(switched).toBeDefined();
      expect(switched.role).toBe(r);
    });
  });

  it('should register a new voluntary donor and auto-issue a digital ID card', () => {
    const res = bloodConnectionStore.registerDonor({
      fullName: 'Kamrul Hasan',
      email: 'kamrul@example.com',
      phone: '+8801700112233',
      bloodGroup: 'B+',
      rhFactor: '+',
      dateOfBirth: '1998-05-12',
      gender: 'male',
      divisionId: 'dhaka',
      districtId: 'dhaka',
      upazilaId: 'mirpur',
      address: 'Mirpur-10, Dhaka',
    });

    expect(res.user.fullName).toBe('Kamrul Hasan');
    expect(res.donor.bloodGroup).toBe('B+');
    expect(res.idCard.idNumber).toContain('BC-DON');
    expect(res.idCard.verificationToken).toBeTruthy();

    // Verify lookup by token works for newly registered donor
    const retrieved = bloodConnectionStore.getIdCardByToken(res.idCard.verificationToken);
    expect(retrieved).toBeDefined();
    expect(retrieved?.fullName).toBe('Kamrul Hasan');
  });

  it('should update donor average rating upon review submission', () => {
    const initialReviews = bloodConnectionStore.getReviewsByDonorId('donor-1');
    const initialCount = initialReviews.length;

    bloodConnectionStore.addReview({
      donorId: 'donor-1',
      reviewerId: 'guest-1',
      reviewerName: 'Hospital Staff',
      reviewerRole: 'Medical Officer',
      rating: 5,
      feedback: 'Excellent response time and cooperation.',
      isVerifiedInteraction: true,
    });

    const donor = bloodConnectionStore.getDonorById('donor-1');
    expect(donor?.reviewsCount).toBe(initialCount + 1);
    expect(donor?.averageRating).toBeGreaterThanOrEqual(4.9);
  });
});
