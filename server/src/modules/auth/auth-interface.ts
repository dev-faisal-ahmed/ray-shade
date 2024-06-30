import { Types } from 'mongoose';

export type AuthRoleType = 'USER' | 'MANAGER';

export type AuthType = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: AuthRoleType;
};
