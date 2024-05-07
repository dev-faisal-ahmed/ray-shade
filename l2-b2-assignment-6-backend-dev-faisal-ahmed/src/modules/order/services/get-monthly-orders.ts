import { AuthRoleType } from '../../auth/auth-interface';
import { OrderModel } from '../order-model';

export async function GetMonthlyOrders(userId: string, role: AuthRoleType) {
  const startDate = new Date();
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(0);
  endDate.setHours(23, 59, 59, 999);

  let addedBy = {};
  if (role === 'USER') addedBy = { addedBy: userId };

  const orders = await OrderModel.find({
    ...addedBy,
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  })
    .populate('productId', 'image name')
    .sort({ date: -1 });

  return orders;
}
