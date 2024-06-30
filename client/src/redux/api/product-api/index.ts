import { ProductType, ServerResponseType } from '@/lib/types/data-types';
import { AddProductRequestType, BulkDeleteRequestType } from './types';
import { BaseApi } from '..';

const PRODUCT_URL = 'products';
const ProductApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation<
      ServerResponseType<null>,
      AddProductRequestType
    >({
      query: (data) => ({
        url: `${PRODUCT_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['all-products'],
    }),

    getAllProduct: builder.query<ServerResponseType<ProductType[]>, null>({
      query: () => `${PRODUCT_URL}`,
      providesTags: ['all-products'],
    }),

    getProductById: builder.query<ServerResponseType<ProductType>, string>({
      query: (productId) => `${PRODUCT_URL}/${productId}`,
      providesTags: ['product-by-id'],
    }),

    updateProduct: builder.mutation<ServerResponseType<null>, ProductType>({
      query: (payload) => ({
        url: `${PRODUCT_URL}/${payload._id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['all-products'],
    }),

    deleteProduct: builder.mutation<ServerResponseType<null>, string>({
      query: (id) => ({
        url: `${PRODUCT_URL}/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['all-products'],
    }),

    bulkDelete: builder.mutation<
      ServerResponseType<null>,
      BulkDeleteRequestType
    >({
      query: (payload) => ({
        url: `${PRODUCT_URL}/bulk`,
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['all-products'],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useBulkDeleteMutation,
} = ProductApi;
