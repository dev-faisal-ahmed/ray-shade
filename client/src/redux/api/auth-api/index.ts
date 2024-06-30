import { LoginRequestType, RegisterRequestType } from './types';
import { ServerResponseType } from '@/lib/types/data-types';
import { BaseApi } from '..';

const AUTH_URL = 'auth';
export const AuthApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<ServerResponseType<null>, RegisterRequestType>({
      query: (payload) => ({
        url: `${AUTH_URL}/register`,
        method: 'POST',
        body: payload,
      }),
    }),

    login: builder.mutation<
      ServerResponseType<{ token: string }>,
      LoginRequestType
    >({
      query: (payload) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [
        'all-products',
        'daily-orders',
        'monthly-orders',
        'orders',
        'product-by-id',
        'weekly-orders',
        'yearly-orders',
      ],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = AuthApi;
