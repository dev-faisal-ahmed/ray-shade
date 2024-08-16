import { Schema, model } from 'mongoose';
import { AuthType } from './auth-interface';
import { AuthRoles } from './auth-constants';

export const AuthSchema = new Schema<AuthType>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: AuthRoles, default: 'USER' },
  address: { type: String },
  phone: { type: String },
});

export const AuthModel = model<AuthType>('user', AuthSchema);
