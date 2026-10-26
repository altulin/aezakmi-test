import { baseApi } from '@/shared/api/baseApi';
import type { LatestRatesResponse } from '../model/types';
import { BASE_CURRENCY, CURRENCIES } from '../config/currencies';

export const currencyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLatestRates: build.query<LatestRatesResponse, void>({
      query: () => ({
        url: 'latest',
        params: {
          base: BASE_CURRENCY,
          symbols: CURRENCIES.join(','),
        },
      }),
    }),
  }),
});

export const { useGetLatestRatesQuery } = currencyApi;
