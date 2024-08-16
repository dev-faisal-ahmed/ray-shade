import { serverAddress } from '@/lib/data/server-address';
import { getTokenFromLocal } from '@/lib/helper/token-helper';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuey = fetchBaseQuery({
  baseUrl: `${serverAddress}`,
  prepareHeaders: (headers) => {
    const token = getTokenFromLocal();
    if (token) {
      headers.set('authorization', `${token}`);
    }
    return headers;
  },
});

export const BaseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQuey,
  tagTypes: [
    'all-products',
    'product-by-id',
    'orders',
    'single-order',
    'daily-orders',
    'weekly-orders',
    'monthly-orders',
    'yearly-orders',
    'user-info',
  ],
  endpoints: () => ({}),
});
