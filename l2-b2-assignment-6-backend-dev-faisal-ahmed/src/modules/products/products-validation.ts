import { z } from 'zod';
import { Genders, LensesSize } from './products-constant';

const AddProductValidationSchema = z.object({
  name: z.string({ required_error: 'Product name is required' }),
  image: z.string({ required_error: 'Image is required' }),
  price: z.number({ required_error: 'Price is required' }),
  quantity: z.number({ required_error: 'Quantity is required' }),
  material: z.string({ required_error: 'Material is required' }),
  shape: z.string({ required_error: 'Shape is required' }),
  lensType: z.string({ required_error: 'LensType is required' }),
  brand: z.string({ required_error: 'Brand is required' }),
  gender: z.enum([...(Genders as [string, ...string[]])], {
    required_error: 'Gender has to be either male of female',
  }),
  colors: z.string({ required_error: 'Color is required' }).array(),
  bridgeLength: z.number({ required_error: 'Bridge length is required' }),
  lensSize: z.enum([...(LensesSize as [string, ...string[]])], {
    required_error: 'Lens size has to be in [xs, sm, lg, xl]',
  }),
});

const UpdateProductValidationSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  material: z.string().optional(),
  shape: z.string().optional(),
  lensType: z.string().optional(),
  brand: z.string().optional(),
  gender: z.enum([...(Genders as [string, ...string[]])]).optional(),
  colors: z.string().array(),
  bridgeLength: z.number().optional(),
  lensSize: z.enum([...(LensesSize as [string, ...string[]])]).optional(),
});

const DeleteMultipleProductsValidationSchema = z.object({
  productIds: z
    .string({ required_error: 'Product id is required and should be in array' })
    .array(),
});

export type AddProductType = z.infer<typeof AddProductValidationSchema>;
export type UpdateProductType = z.infer<typeof UpdateProductValidationSchema>;

export const ProductValidation = {
  AddProductValidationSchema,
  UpdateProductValidationSchema,
  DeleteMultipleProductsValidationSchema,
};
