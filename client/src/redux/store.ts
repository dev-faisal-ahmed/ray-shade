import { configureStore } from '@reduxjs/toolkit';
import { BaseApi } from './api';
import { userSlice } from './slices/user-slice';
import { productSlice } from './slices/product-slice';
import { orderSlice } from './slices/order-slice';

export const store = configureStore({
  reducer: {
    [BaseApi.reducerPath]: BaseApi.reducer,
    user: userSlice.reducer,
    product: productSlice.reducer,
    order: orderSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(BaseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
