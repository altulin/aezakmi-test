import { baseApi } from '@/shared/api/baseApi';
import { getDateDaysAgo } from '@/shared/lib/date';
import type {
  LatestRates,
  TimeseriesResponse,
  RateHistoryPoint,
} from '../model/types';
import {
  BASE_CURRENCY,
  CURRENCIES,
  type CurrencyCode,
} from '../config/currencies';
import { PERIODS, type Period } from '../config/periods';

export const currencyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLatestRates: build.query<LatestRates, void>({
      query: () => {
        const startDate = getDateDaysAgo(10);
        return {
          url: `${startDate}..`,
          params: {
            base: BASE_CURRENCY,
            symbols: CURRENCIES.join(','),
          },
        };
      },
      transformResponse: (response: TimeseriesResponse): LatestRates => {
        const dates = Object.keys(response.rates).sort();

        if (dates.length === 0) {
          throw new Error('No rates available for the requested period');
        }

        const currentDate = dates[dates.length - 1];
        const previousDate =
          dates.length >= 2 ? dates[dates.length - 2] : undefined;

        return {
          date: currentDate,
          rates: response.rates[currentDate] ?? {},
          previousRates: previousDate
            ? (response.rates[previousDate] ?? {})
            : {},
        };
      },
    }),

    getRateHistory: build.query<
      RateHistoryPoint[],
      { currency: CurrencyCode; period: Period }
    >({
      query: ({ currency, period }) => {
        const startDate = getDateDaysAgo(PERIODS[period]);
        return {
          url: `${startDate}..`,
          params: {
            base: BASE_CURRENCY,
            symbols: currency,
          },
        };
      },
      transformResponse: (
        response: TimeseriesResponse,
        _meta,
        { currency }
      ): RateHistoryPoint[] => {
        return Object.entries(response.rates)
          .map(([date, rates]) => ({
            date,
            value: rates[currency],
          }))
          .filter(
            (point): point is RateHistoryPoint => point.value !== undefined
          )
          .sort((a, b) => a.date.localeCompare(b.date));
      },
    }),
  }),
});

export const { useGetLatestRatesQuery, useGetRateHistoryQuery } = currencyApi;
