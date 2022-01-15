import { Config, formatDecimal, timeToHoursByString } from '../config';

describe('Config functions', () => {
  describe('timeToHoursByString', () => {
    // it.each`
    //   text     | expected
    //   3m       | ${3 * 30 * 24}
    //   7w       | ${7 * 7 * 24}
    //   2d       | ${2 * 24}
    //   3h       | ${3}
    //   3min     | ${3 / 60}
    //   7m2w2d3h | ${7 * 30 * 24 + 2 * 7 * 24 + 2 * 24 + 3}
    // `
    it.each([
      { text: '3m', expected: 3 * 30 * 24 },
      { text: '7w', expected: 7 * 7 * 24 },
      { text: '2d', expected: 2 * 24 },
      { text: '3h', expected: 3 },
      { text: '3min', expected: 0 },
      { text: '7m2w2d3h', expected: 7 * 30 * 24 + 2 * 7 * 24 + 2 * 24 + 3 },
      { text: '7m2w2d3h5min', expected: 7 * 30 * 24 + 2 * 7 * 24 + 2 * 24 + 3 }
    ])('Parse $text', ({ text, expected }) => {
      const result = timeToHoursByString(text);
      expect(result).toBe(expected);
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
