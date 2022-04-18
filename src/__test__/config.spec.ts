import { Config, formatDate, formatDecimal, getDay, getMonth, getOpenDate, timeToHoursByString } from '../config'

describe('Config functions', () => {
  describe('timeToHoursByString', () => {
    it.each([
      { text: '3M', expected: 3 * 30 * 24 },
      { text: '7W', expected: 7 * 7 * 24 },
      { text: '2D', expected: 2 * 24 },
      { text: '3h', expected: 3 },
      { text: '3m', expected: 3 / 60 },
      { text: '7M2W2D3h', expected: 7 * 30 * 24 + 2 * 7 * 24 + 2 * 24 + 3 },
      { text: '7M2W2D3h5m', expected: Math.floor((7 * 30 * 24 + 2 * 7 * 24 + 2 * 24 + 3 + 5 / 60) * 100) / 100 },
    ])('Parse $text', ({ text, expected }) => {
      const result = timeToHoursByString(text)
      expect(result).toBe(expected)
    })
  })
  describe('formatDecimal', () => {
    it('With comma', () => {
      Config.REPLACE_DOTS = true
      expect(formatDecimal(3.5)).toBe('3,5')
    })
    it('With dot', () => {
      Config.REPLACE_DOTS = false
      expect(formatDecimal(3.5)).toBe('3.5')
    })
  })
  it('getDay', () => {
    const date = new Date('2020-01-03T04:05:06')
    expect(getDay(date)).toBe('2020-01-03')
  })
  it('getMonth', () => {
    const date = new Date('2020-01-03T04:05:06')
    expect(getMonth(date)).toBe('2020-01-01')
  })
  describe('getOpenDate', () => {
    it('minutes', () => {
      const date = new Date('2020-01-03T04:05:06')
      const diff = 5 / 60 // 5 minutes
      expect(formatDate(getOpenDate(date, diff))).toBe('2020-01-03 04:00:06')
    })
    it('hours', () => {
      const date = new Date('2020-01-03T04:05:06')
      const diff = 2 // 2 hours
      expect(formatDate(getOpenDate(date, diff))).toBe('2020-01-03 02:05:06')
    })
  })
})
