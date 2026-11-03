import { describe, it, expect } from 'vitest';
import {
  BANGLADESH_DIVISIONS,
  getAllDistricts,
  getDistrictsByDivision,
  getUpazilasByDistrict,
} from '../data/bangladeshLocations';

describe('Bangladesh National Location System (PART 07)', () => {
  it('should have all 8 administrative divisions', () => {
    expect(BANGLADESH_DIVISIONS).toHaveLength(8);
    const divisionIds = BANGLADESH_DIVISIONS.map((d) => d.id);
    expect(divisionIds).toContain('dhaka');
    expect(divisionIds).toContain('chattogram');
    expect(divisionIds).toContain('rajshahi');
    expect(divisionIds).toContain('khulna');
    expect(divisionIds).toContain('barishal');
    expect(divisionIds).toContain('sylhet');
    expect(divisionIds).toContain('rangpur');
    expect(divisionIds).toContain('mymensingh');
  });

  it('should have exactly 64 verified districts with English and Bangla names', () => {
    const allDistricts = getAllDistricts();
    expect(allDistricts).toHaveLength(64);
    allDistricts.forEach((dist) => {
      expect(dist.name).toBeTruthy();
      expect(dist.bnName).toBeTruthy();
      expect(dist.divisionId).toBeTruthy();
      expect(dist.upazilas.length).toBeGreaterThan(0);
    });
  });

  it('should return correct dependent districts and upazilas', () => {
    const dhakaDistricts = getDistrictsByDivision('dhaka');
    expect(dhakaDistricts.length).toBe(13);

    const dhakaUpazilas = getUpazilasByDistrict('dhaka');
    expect(dhakaUpazilas.some((u) => u.name === 'Dhanmondi')).toBe(true);
    expect(dhakaUpazilas.some((u) => u.name === 'Shahbagh')).toBe(true);
  });
});
