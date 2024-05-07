import { z } from 'zod';

export const LoginValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid Email' }),
  password: z.string().min(6, { message: 'Min Length is 6' }),
});

export type LoginSchemaType = z.infer<typeof LoginValidationSchema>;
