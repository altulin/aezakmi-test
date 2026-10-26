import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RATES_API_URL } from '../config/api';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: RATES_API_URL }),
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
