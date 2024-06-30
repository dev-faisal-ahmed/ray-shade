import { zodNumberMinValidator } from '@/lib/helper/utility-helper';
import { z } from 'zod';

export const ProductValidationSchema = z.object({
  name: z
    .string({ required_error: 'Product name is required' })
    .min(2, { message: 'product name has to be at least 2 characters' }),

  price: z
    .string({ required_error: 'Price is required' })
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: 'Price has to be string',
    })
    .refine((val) => zodNumberMinValidator(val, 1), {
      message: 'Price Has to be more than 0',
    }),

  quantity: z
    .string({ required_error: 'Quantity is required' })
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: 'Quantity has to be string',
    })
    .refine((val) => zodNumberMinValidator(val, 1), {
      message: 'Quantity Has to be more than 0',
    }),

  material: z.string({ required_error: 'Material is required' }).min(2),
  shape: z.string({ required_error: 'Shape is required' }).min(2),
  lensType: z.string({ required_error: 'LensType is required' }).min(2),
  brand: z.string({ required_error: 'Brand is required' }).min(2),

  bridgeLength: z
    .string({ required_error: 'Bridge Length is required' })
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: 'Bridge Length has to be string',
    })
    .refine((val) => zodNumberMinValidator(val, 1), {
      message: 'Bridge Length Has to be more than 0',
    }),
});

export type ProductSchemaType = z.infer<typeof ProductValidationSchema>;
