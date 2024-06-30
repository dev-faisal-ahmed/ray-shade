import mongoose from 'mongoose';
import { AddOrderSchemaType } from '../order-validation';
import { AppError } from '../../../utils/app-error';
import { OrderModel } from '../order-model';
import { ProductModel } from '../../products/product-model';

export async function AddOrder(userId: string, payload: AddOrderSchemaType) {
  const session = await mongoose.startSession();
  const { date, productId, quantity } = payload;
  try {
    session.startTransaction();
    const newOrder = await OrderModel.create({
      ...payload,
      addedBy: userId,
      date: new Date(date),
    });

    if (!newOrder) throw new AppError('Error While Adding New Order', 400);

    const updateInfo = await ProductModel.findByIdAndUpdate(productId, {
      $inc: { quantity: -quantity },
    });

    if (!updateInfo)
      throw new AppError('Error While Updating Product Quantity', 400);

    await session.commitTransaction();
    await session.endSession();

    // now sending all data
    const { _id } = newOrder.toObject();

    return _id;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.log(error);
    if (error instanceof AppError)
      throw new AppError(error.message, error.status);
    else throw new AppError('Failed to add order', 400);
  }
}
