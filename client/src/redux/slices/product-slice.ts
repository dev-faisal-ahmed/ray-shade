import { ObjectType, ProductType } from '@/lib/types/data-types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ProductSliceType = {
  bulkedProduct: ObjectType<boolean>;
  products: ProductType[];
  isFiltered: boolean;
};

const initialState: ProductSliceType = {
  bulkedProduct: {},
  products: [],
  isFiltered: false,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.products = action.payload;
      return state;
    },

    bulkSelectAll: (state) => {
      const bulked = state.products.reduce(
        (bulk: ObjectType<boolean>, product) => {
          bulk[product._id] = true;
          return bulk;
        },
        {},
      );
      state.bulkedProduct = bulked;
      return state;
    },

    bulkDeSelectAll: (state) => {
      state.bulkedProduct = {};
      return state;
    },

    bulkAdd: (state, action: PayloadAction<string>) => {
      state.bulkedProduct[action.payload] = true;
      return state;
    },

    bulkRemove: (state, action: PayloadAction<string>) => {
      delete state.bulkedProduct[action.payload];
      return state;
    },

    updateFilter: (state, action: PayloadAction<boolean>) => {
      state.isFiltered = action.payload;
      return state;
    },
  },
});

export const {
  updateProducts,
  bulkSelectAll,
  bulkDeSelectAll,
  bulkAdd,
  bulkRemove,
  updateFilter,
} = productSlice.actions;
