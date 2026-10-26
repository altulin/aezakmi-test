import { CURRENCIES, type CurrencyCode } from '../config/currencies';

export const SELL_MARKUP = 0.02;
export const BUY_DISCOUNT = 0.015;

const RATE_PRECISION = 4;

export type ChangeDirection = 'up' | 'down' | 'flat';

const rateFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: RATE_PRECISION,
  maximumFractionDigits: RATE_PRECISION,
});

const changeFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: RATE_PRECISION,
  maximumFractionDigits: RATE_PRECISION,
  signDisplay: 'exceptZero',
});

export const getSellRate = (rate: number): number => rate * (1 + SELL_MARKUP);
export const getBuyRate = (rate: number): number => rate * (1 - BUY_DISCOUNT);
export const formatRate = (rate: number): string => rateFormatter.format(rate);
export const getRateChange = (current: number, previous: number): number =>
  current - previous;
export const formatChange = (change: number): string =>
  changeFormatter.format(change);

export const getChangeDirection = (change: number): ChangeDirection => {
  const rounded = Number(change.toFixed(RATE_PRECISION));
  if (rounded > 0) return 'up';
  if (rounded < 0) return 'down';
  return 'flat';
};

export const isCurrencyCode = (value: unknown): value is CurrencyCode => {
  return (
    typeof value === 'string' &&
    (CURRENCIES as readonly string[]).includes(value)
  );
};
