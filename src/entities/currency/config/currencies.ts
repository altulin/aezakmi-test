import auFlag from 'flag-icons/flags/4x3/au.svg';
import brFlag from 'flag-icons/flags/4x3/br.svg';
import caFlag from 'flag-icons/flags/4x3/ca.svg';
import chFlag from 'flag-icons/flags/4x3/ch.svg';
import euFlag from 'flag-icons/flags/4x3/eu.svg';
import gbFlag from 'flag-icons/flags/4x3/gb.svg';
import jpFlag from 'flag-icons/flags/4x3/jp.svg';

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
  AUD: auFlag,
  BRL: brFlag,
  CAD: caFlag,
  CHF: chFlag,
  EUR: euFlag,
  GBP: gbFlag,
  JPY: jpFlag,
};
