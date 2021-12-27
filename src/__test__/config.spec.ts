import { Config, formatDecimal, timeToHours } from '../config';

describe('Config functions', () => {
  describe('timeToHours', () => {
    it('Parse month', () => {
      const result = timeToHours('3m');
      expect(result).toBe(3 * 30 * 24);
    });
    it('Parse week', () => {
      const result = timeToHours('7w');
      expect(result).toBe(7 * 7 * 24);
    });
    it('Parse days', () => {
      const result = timeToHours('2d');
      expect(result).toBe(2 * 24);
    });
    it('Parse hours', () => {
      const result = timeToHours('3h');
      expect(result).toBe(3);
    });
    it('Parse multiple', () => {
      const result = timeToHours('7m2w2d3h');
      expect(result).toBe(7 * 30 * 24 + 2 * 7 * 24 + 2 * 24 + 3);
    });
  });
  describe('formatDecimal', () => {
    it('With comma', () => {
      Config.REPLACE_DOTS = true;
      expect(formatDecimal(3.5)).toBe('3,5');
    });
    it('With dot', () => {
      Config.REPLACE_DOTS = false;
      expect(formatDecimal(3.5)).toBe('3.5');
    });
  });
});
