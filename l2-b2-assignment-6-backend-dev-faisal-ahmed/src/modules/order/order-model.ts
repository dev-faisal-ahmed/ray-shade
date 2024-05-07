import { Schema, model } from 'mongoose';
import { OrderType } from './oder-interface';

const OrderSchema = new Schema<OrderType>(
  {
    name: { type: String, required: true },
    addedBy: { type: Schema.ObjectId, ref: 'user', required: true },
    productId: { type: Schema.ObjectId, ref: 'product', required: true },
    date: { type: Date, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export const OrderModel = model('order', OrderSchema);
