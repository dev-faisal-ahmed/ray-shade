import { ProductModel } from '../product-model';

export async function GetProductById(userId: string, productId: string) {
  const product = await ProductModel.findOne({
    _id: productId,
    addedBy: userId,
  });

  return product;
}
