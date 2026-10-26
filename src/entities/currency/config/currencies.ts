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

export const CURRENCY_FLAGS: Record<CurrencyCode, string> = {
  AUD: 'au',
  BRL: 'br',
  CAD: 'ca',
  CHF: 'ch',
  EUR: 'eu',
  GBP: 'gb',
  JPY: 'jp',
};
