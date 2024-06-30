import { Types } from 'mongoose';
import { AppError } from '../../../utils/app-error';
import { AuthRoleType } from '../../auth/auth-interface';
import { ProductModel } from '../product-model';

export async function DeleteProduct(
  productId: string,
  role: AuthRoleType,
  userId: Types.ObjectId
) {
  // checking if role is manager or user
  if (role === 'USER') {
    const productInfo = await ProductModel.findOne({
      _id: productId,
      addedBy: userId,
    });

    if (!productInfo)
      throw new AppError('You are not authorized to update this product', 401);
  }

  // deleting the product
  const deleteStatus = await ProductModel.findByIdAndUpdate(productId, {
    isDeleted: true,
  });

  if (!deleteStatus) throw new AppError('Could not delete the product', 400);
  return deleteStatus;
}

export async function DeleteMultipleProducts(
  productIds: string[],
  role: AuthRoleType,
  userId: Types.ObjectId
) {
  if (role === 'USER') {
    // getting all the data
    const allProducts = await ProductModel.find({
      _id: { $in: [...productIds] },
      addedBy: userId,
    });

    if (!allProducts)
      throw new AppError(
        'You are not authorized to delete these products',
        401
      );
  }

  const deleteStatus = await ProductModel.updateMany(
    {
      _id: { $in: [...productIds] },
    },
    {
      isDeleted: true,
    }
  );
  return deleteStatus;
}
