import { z } from 'zod';
import { zodNumberMinValidator } from '../helper/utility-helper';

export const SellValidationSchema = z.object({
  name: z.string().min(2, { message: 'Name has to be at least two character' }),
  quantity: z.string().refine((val) => zodNumberMinValidator(val, 1), {
    message: 'You at least have to sell one product',
  }),
  date: z.string({ required_error: 'Date is required' }),
});

export type SellValidationSchemaType = z.infer<typeof SellValidationSchema>;
