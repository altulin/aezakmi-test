import type { CurrencyCode } from '../config/currencies';

export interface TimeseriesResponse {
  amount: number;
  base: string;
  start_date: string;
  end_date: string;
  rates: Record<string, Partial<Record<CurrencyCode, number>>>;
}

export interface LatestRates {
  date: string;
  rates: Partial<Record<CurrencyCode, number>>;
  previousRates: Partial<Record<CurrencyCode, number>>;
}
