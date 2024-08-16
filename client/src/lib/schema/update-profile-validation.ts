import { z } from 'zod';

export const UpdateProfileSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>;
