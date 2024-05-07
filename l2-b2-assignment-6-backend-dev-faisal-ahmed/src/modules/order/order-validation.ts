import { z } from 'zod';

const AddOrderValidationSchema = z.object({
  productId: z.string(),
  name: z.string(),
  quantity: z.number(),
  date: z.string(),
  price: z.number(),
});

export type AddOrderSchemaType = z.infer<typeof AddOrderValidationSchema>;

export const OrderValidation = { AddOrderValidationSchema };
