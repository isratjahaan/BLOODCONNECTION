import { describe, it, expect, beforeEach } from 'vitest';
import { bloodConnectionStore } from '../services/store';

describe('Automated Donor Availability & 3-Month Rule (PART 09)', () => {
  beforeEach(() => {
    bloodConnectionStore.resetToSeed();
  });

  it('should initialize donor with available status', () => {
    const donor = bloodConnectionStore.getDonorById('donor-1');
    expect(donor).toBeDefined();
    expect(donor?.availabilityStatus).toBe('AVAILABLE');
  });

  it('should transition donor to UNAVAILABLE_TEMPORARY for 3 months upon verified donation', () => {
    const donorBefore = bloodConnectionStore.getDonorById('donor-1');
    const initialDonations = donorBefore!.verifiedDonationsCount;

    const recorded = bloodConnectionStore.recordDonationAndUpdateAvailability(
      'donor-1',
      'Dhaka Medical College Hospital',
      1,
      'user-superadmin'
    );
    expect(recorded).toBe(true);

    const donorAfter = bloodConnectionStore.getDonorById('donor-1');
    expect(donorAfter?.availabilityStatus).toBe('UNAVAILABLE_TEMPORARY');
    expect(donorAfter?.verifiedDonationsCount).toBe(initialDonations + 1);

    // Verify next eligible date is exactly 3 months ahead
    const today = new Date();
    const expectedEligibleMonth = (today.getMonth() + 3) % 12;
    const nextDate = new Date(donorAfter!.nextEligibleDate!);
    expect(nextDate.getMonth()).toBe(expectedEligibleMonth);
  });

  it('should allow manual pause and availability toggle', () => {
    bloodConnectionStore.updateDonorAvailabilityStatus('donor-3', 'UNAVAILABLE_TEMPORARY');
    let donor = bloodConnectionStore.getDonorById('donor-3');
    expect(donor?.availabilityStatus).toBe('UNAVAILABLE_TEMPORARY');

    bloodConnectionStore.updateDonorAvailabilityStatus('donor-3', 'AVAILABLE');
    donor = bloodConnectionStore.getDonorById('donor-3');
    expect(donor?.availabilityStatus).toBe('AVAILABLE');
  });
});
