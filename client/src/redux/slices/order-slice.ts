import { OrderType } from '@/lib/types/data-types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type OrderSliceType = {
  orders: OrderType[];
};

const initialState: OrderSliceType = {
  orders: [],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateOrders: (state, action: PayloadAction<OrderType[]>) => {
      state.orders = action.payload;
      return state;
    },
  },
});

export const { updateOrders } = orderSlice.actions;
