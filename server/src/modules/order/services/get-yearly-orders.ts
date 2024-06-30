import { AuthRoleType } from '../../auth/auth-interface';
import { OrderModel } from '../order-model';

export async function GetYearlyOrders(userId: string, role: AuthRoleType) {
  const date = new Date();
  const startDate = new Date(`${date.getFullYear()}-01-01`);
  const endDate = new Date(`${startDate.getFullYear() + 1}-01-01`);

  let addedBy = {};
  if (role === 'USER') addedBy = { addedBy: userId };

  const yearlyOrders = await OrderModel.find({
    ...addedBy,
    date: { $gte: startDate, $lte: endDate },
  })
    .populate('productId', 'image name')
    .sort({ date: -1 });

  return yearlyOrders;
}
