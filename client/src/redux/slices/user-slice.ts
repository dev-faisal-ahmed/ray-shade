import { decodeUser, getTokenFromLocal } from '@/lib/helper/token-helper';
import { UserRoleType, UserType } from '@/lib/types/data-types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const token = getTokenFromLocal();
const user = decodeUser(token);

const initialState: UserType | null = {
  _id: user?._id as string,
  name: user?.name as string,
  email: user?.email as string,
  role: user?.role as UserRoleType,
  address: user?.address,
  phone: user?.phone,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<string>) => {
      const user = decodeUser(action.payload);
      state = user as UserType;
      return state;
    },

    logOutUser: (state) => {
      state._id = '';
      state.email = '';
      state.name = '';
      return state;
    },
  },
});

export const { loginUser, logOutUser } = userSlice.actions;
