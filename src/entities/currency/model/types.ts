import type { CurrencyCode } from '../config/currencies';

export interface LatestRatesResponse {
  amount: number;
  base: string;
  date: string;
  rates: Partial<Record<CurrencyCode, number>>;
}
