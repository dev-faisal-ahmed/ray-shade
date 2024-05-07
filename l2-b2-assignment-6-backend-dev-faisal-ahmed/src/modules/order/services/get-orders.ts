import { AuthRoleType } from '../../auth/auth-interface';
import { OrderModel } from '../order-model';

export async function GetAllOrders(userId: string, role: AuthRoleType) {
  let addedBy = {};
  if (role === 'USER') addedBy = { addedBy: userId };

  const allOrders = await OrderModel.find({ ...addedBy })
    .populate('productId', 'image name')
    .sort({ date: -1 });

  return allOrders;
}
