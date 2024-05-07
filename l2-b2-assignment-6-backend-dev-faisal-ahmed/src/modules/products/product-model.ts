import { Schema, model } from 'mongoose';
import { ProductType } from './products-interface';
import { Genders, LensesSize } from './products-constant';

const ProductSchema = new Schema<ProductType>(
  {
    name: { type: String, required: true, unique: true },
    addedBy: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    brand: { type: String, required: true },
    colors: { type: [String], required: true },
    gender: { type: String, enum: Genders, required: true },
    image: { type: String, required: true },
    bridgeLength: { type: Number, requiredPaths: true },
    lensSize: { type: String, enum: LensesSize, required: true },
    lensType: { type: String, required: true },
    material: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    shape: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ProductModel = model('product', ProductSchema);
