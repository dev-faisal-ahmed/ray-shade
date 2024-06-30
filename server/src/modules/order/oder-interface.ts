import { Types } from 'mongoose';

export type OrderType = {
  name: string;
  addedBy: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
  price: number;
  date: Date;
};
