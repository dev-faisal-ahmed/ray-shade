import { OrderType } from '@/lib/types/data-types';

export type AddOrderRequestType = Omit<OrderType, 'productId' | '_id'> & {
  productId: string;
};

export type AddOrderResponseDataType = {
  orderId: string;
};
