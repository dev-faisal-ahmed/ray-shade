import { z } from 'zod';
import { zodIsNumber, zodNumberMinValidator } from '../helper/utility-helper';

export const FilterValidationSchema = z.object({
  name: z.string().optional(),
  material: z.string().optional().default(''),
  shape: z.string().optional().default(''),
  lensType: z.string().optional().default(''),
  brand: z.string().optional().default(''),
  maxPrice: z
    .string()
    .optional()
    .refine((val) => zodIsNumber(val as string))
    .refine((val) => zodNumberMinValidator(val as string, 0), {
      message: 'Max Price has to be more than zero',
    }),

  minPrice: z
    .string()
    .optional()
    .refine((val) => zodIsNumber(val as string))
    .refine((val) => zodNumberMinValidator(val as string, 0), {
      message: 'Min Price has to be more than zero',
    }),

  color: z.string().optional(),
  bridgeLength: z
    .string()
    .optional()
    .refine((val) => zodIsNumber(val as string))
    .refine((val) => zodNumberMinValidator(val as string, 0), {
      message: 'Bridge length has to be more than zero',
    }),
});

export type FilterValidationSchemaType = z.infer<typeof FilterValidationSchema>;
