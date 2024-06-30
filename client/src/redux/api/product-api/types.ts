import { ProductType } from '@/lib/types/data-types';

export type AddProductRequestType = Omit<ProductType, '_id'>;

export type BulkDeleteRequestType = {
  productIds: string[];
};
