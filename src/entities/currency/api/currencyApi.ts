import { baseApi } from '@/shared/api/baseApi';
import { getDateDaysAgo } from '@/shared/lib/date';
import type { LatestRates, TimeseriesResponse } from '../model/types';
import { BASE_CURRENCY, CURRENCIES } from '../config/currencies';

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
  }),
});

export const { useGetLatestRatesQuery } = currencyApi;
