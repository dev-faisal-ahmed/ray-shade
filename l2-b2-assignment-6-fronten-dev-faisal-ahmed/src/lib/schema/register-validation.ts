import { z } from 'zod';

export const RegisterValidationSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First Name at least has to be 2 characters' }),
  lastName: z
    .string()
    .min(2, { message: 'Last Name at least has to be 2 characters' }),
  email: z.string().email({ message: 'Invalid Email' }),
  password: z.string().min(6, { message: 'Min Length is 6' }),
  confirmPassword: z.string().min(6, { message: 'Min Length is 6' }),
});

export type RegisterSchemaType = z.infer<typeof RegisterValidationSchema>;
