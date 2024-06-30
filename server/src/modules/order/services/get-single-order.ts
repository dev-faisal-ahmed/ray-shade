import { AuthRoleType } from '../../auth/auth-interface';
import { OrderModel } from '../order-model';

export async function GetSingleOrder(
  orderId: string,
  role: AuthRoleType,
  userId: string
) {
  let addedBy = {};

  if (role === 'USER') addedBy = { addedBy: userId };

  const orderData = await OrderModel.findOne({
    ...addedBy,
    _id: orderId,
  }).populate('productId', 'image name');
  return orderData;
}
