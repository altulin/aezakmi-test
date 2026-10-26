export const BASE_CURRENCY = 'USD' as const;

export const CURRENCIES = [
  'AUD',
  'BRL',
  'CAD',
  'CHF',
  'EUR',
  'GBP',
  'JPY',
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number];
