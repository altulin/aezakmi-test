import {
  formatChange,
  formatPercentChange,
  formatRate,
  getBuyRate,
  getChangeDirection,
  getPercentChange,
  getSellRate,
  isCurrencyCode,
} from './rates';

describe('rates', () => {
  it('formats a rate with 4 decimals', () => {
    expect(formatRate(1.5)).toBe('1.5000');
    expect(formatRate(157.87884)).toBe('157.8788');
  });

  it('applies the sell markup and the buy discount', () => {
    expect(getSellRate(100)).toBeCloseTo(102);
    expect(getBuyRate(100)).toBeCloseTo(98.5);
  });

  it('shows the sign of a change, but not for zero', () => {
    expect(formatChange(0.0123)).toBe('+0.0123');
    expect(formatChange(-0.5)).toBe('-0.5000');
    expect(formatChange(0)).toBe('0.0000');
  });

  it('formats a percent change', () => {
    expect(getPercentChange(100, 105)).toBeCloseTo(0.05);
    expect(formatPercentChange(-0.005)).toBe('-0.50%');
  });

  it('treats a change that rounds to zero as flat', () => {
    expect(getChangeDirection(0.001)).toBe('up');
    expect(getChangeDirection(-0.001)).toBe('down');
    expect(getChangeDirection(0.00004)).toBe('flat');
    expect(getChangeDirection(-0.00004)).toBe('flat');
  });

  it('accepts only supported currency codes', () => {
    expect(isCurrencyCode('EUR')).toBe(true);
    expect(isCurrencyCode('eur')).toBe(false);
    expect(isCurrencyCode('BGN')).toBe(false);
    expect(isCurrencyCode(null)).toBe(false);
  });
});
