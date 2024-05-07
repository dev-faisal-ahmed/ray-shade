import { Types } from 'mongoose';
import { AppError } from '../../../utils/app-error';
import { AuthRoleType } from '../../auth/auth-interface';
import { ProductModel } from '../product-model';
import { UpdateProductType } from '../products-validation';

export async function UpdateProduct(
  productId: string,
  payload: UpdateProductType,
  role: AuthRoleType,
  userId: Types.ObjectId
) {
  if (role === 'USER') {
    const productInfo = await ProductModel.findOne({
      _id: productId,
      addedBy: userId,
    });

    if (!productInfo)
      throw new AppError('You are not authorized to update this product', 401);
  }

  const updateProductStatus = await ProductModel.findByIdAndUpdate(
    productId,
    payload,
    { runValidators: true }
  );

  if (!updateProductStatus)
    throw new AppError('Could not update the product', 400);

  return updateProductStatus;
}
