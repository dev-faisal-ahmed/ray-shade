import { AppError } from '../../../utils/app-error';
import { ProductModel } from '../product-model';
import { AddProductType } from '../products-validation';

export async function AddProduct(userId: string, payload: AddProductType) {
  const newProduct = await ProductModel.create({ ...payload, addedBy: userId });
  if (!newProduct) throw new AppError('Product could not be created', 400);

  return newProduct;
}
