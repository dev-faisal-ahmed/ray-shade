import { z } from 'zod';
import { AuthRoles } from './auth-constants';

const EmailSubSchema = z
  .string()
  .email({ message: 'Please provide a valid email' });

const PasswordSubSchema = z
  .string()
  .min(6, { message: 'Password  has to be at least 6 characters' });

const AuthRegisterSchema = z.object({
  name: z.string().min(2, { message: 'Name has to be more than 1 characters' }),
  email: EmailSubSchema,
  password: PasswordSubSchema,
  role: z.enum([...(AuthRoles as [string, ...string[]])]).optional(),
});

const AuthLoginSchema = z.object({
  email: EmailSubSchema,
  password: PasswordSubSchema,
});

export type AuthRegisterPayloadType = z.infer<typeof AuthRegisterSchema>;
export type AuthLoginPayloadType = z.infer<typeof AuthLoginSchema>;

export const AuthValidation = { AuthRegisterSchema, AuthLoginSchema };
