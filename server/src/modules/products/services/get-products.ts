import { AuthRoleType } from '../../auth/auth-interface';
import { ProductModel } from '../product-model';

export async function GetProducts(
  userId: string,
  role: AuthRoleType,
  query: any
) {
  const material = query.material || '';
  const shape = query.shape || '';
  const lensType = query.lensType || '';
  const brand = query.brand || '';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '9999';
  const gender = query.gender || '';
  const lensSize = query.lensSize || '';
  const bridgeLength = query.bridgeLength || '0';

  let addedBy = {};
  if (role === 'USER') addedBy = { addedBy: userId };

  const products = await ProductModel.find({
    ...addedBy,
    material: { $regex: material, $options: 'i' },
    shape: { $regex: shape, $options: 'i' },
    lensType: { $regex: lensType, $options: 'i' },
    brand: { $regex: brand, $options: 'i' },
    price: { $gte: Number(minPrice), $lte: Number(maxPrice) },
    gender: { $regex: gender, $options: 'i' },
    lensSize: { $regex: lensSize, $options: 'i' },
    bridgeLength: { $gte: Number(bridgeLength) },
    isDeleted: false,
  }).sort({ createdAt: -1 });

  return products;
}
