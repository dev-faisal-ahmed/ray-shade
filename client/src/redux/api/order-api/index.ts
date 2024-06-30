import { OrderType, ServerResponseType } from '@/lib/types/data-types';
import { AddOrderRequestType, AddOrderResponseDataType } from './types';
import { BaseApi } from '..';

const ORDER_URL = 'orders';
const OrderApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation<
      ServerResponseType<AddOrderResponseDataType>,
      AddOrderRequestType
    >({
      query: (payload) => ({
        url: `${ORDER_URL}`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [
        'all-products',
        'orders',
        'daily-orders',
        'weekly-orders',
        'monthly-orders',
        'yearly-orders',
      ],
    }),

    getOrderById: builder.query<ServerResponseType<OrderType>, string>({
      query: (orderId) => `${ORDER_URL}/${orderId}`,
      providesTags: ['single-order'],
    }),

    getAllOrders: builder.query<ServerResponseType<OrderType[]>, null>({
      query: () => `${ORDER_URL}`,
      providesTags: ['orders'],
    }),

    getDailyOrders: builder.query<ServerResponseType<OrderType[]>, null>({
      query: () => `${ORDER_URL}/daily`,
      providesTags: ['daily-orders'],
    }),

    getWeeklyOrders: builder.query<ServerResponseType<OrderType[]>, null>({
      query: () => `${ORDER_URL}/weekly`,
      providesTags: ['weekly-orders'],
    }),

    getMonthlyOrders: builder.query<ServerResponseType<OrderType[]>, null>({
      query: () => `${ORDER_URL}/monthly`,
      providesTags: ['monthly-orders'],
    }),

    getYearlyOrders: builder.query<ServerResponseType<OrderType[]>, null>({
      query: () => `${ORDER_URL}/yearly`,
      providesTags: ['yearly-orders'],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  useGetDailyOrdersQuery,
  useGetWeeklyOrdersQuery,
  useGetMonthlyOrdersQuery,
  useGetYearlyOrdersQuery,
} = OrderApi;
