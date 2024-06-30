/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserType } from '@/lib/types/data-types';

export type RegisterRequestType = Omit<UserType, '_id' | 'role'> & {
  password: string;
};

export type LoginRequestType = {
  email: string;
  password: string;
};
