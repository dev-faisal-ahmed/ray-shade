import { AddOrder } from './add-order';
import { GetDailyOrders } from './get-daily-orders';
import { GetMonthlyOrders } from './get-monthly-orders';
import { GetAllOrders } from './get-orders';
import { GetSingleOrder } from './get-single-order';
import { GetWeeklyOrders } from './get-weekly-orders';
import { GetYearlyOrders } from './get-yearly-orders';

export const OrderServices = {
  AddOrder,
  GetSingleOrder,
  GetAllOrders,
  GetMonthlyOrders,
  GetWeeklyOrders,
  GetDailyOrders,
  GetYearlyOrders,
};
