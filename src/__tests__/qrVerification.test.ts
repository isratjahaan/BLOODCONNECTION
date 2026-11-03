import { describe, it, expect, beforeEach } from 'vitest';
import { bloodConnectionStore } from '../services/store';

describe('Digital ID Card & QR Verification Engine (PART 05)', () => {
  beforeEach(() => {
    bloodConnectionStore.resetToSeed();
  });

  it('should find active ID card by verification token', () => {
    const verifiedCard = bloodConnectionStore.getIdCardByToken('bc-token-superadmin');
    expect(verifiedCard).toBeDefined();
    expect(verifiedCard?.fullName).toBe('Dr. Rafiqul Islam Chowdhury');
    expect(verifiedCard?.status).toBe('ACTIVE');
    expect(verifiedCard?.role).toBe('SUPER_ADMIN');
  });

  it('should find donor ID card by token with blood group and donations', () => {
    const donorCard = bloodConnectionStore.getIdCardByToken('bc-token-donor1');
    expect(donorCard).toBeDefined();
    expect(donorCard?.fullName).toBe('Tariqul Islam Roni');
    expect(donorCard?.bloodGroup).toBe('O+');
    expect(donorCard?.status).toBe('ACTIVE');
  });

  it('should return undefined for forged or fake QR tokens', () => {
    const fake = bloodConnectionStore.getIdCardByToken('fake-hacker-token-123');
    expect(fake).toBeUndefined();
  });
});
