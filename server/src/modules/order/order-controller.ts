import { SendSuccessResponse } from '../../utils/response-helper';
import { TryCatch } from '../../utils/try-catch';
import { OrderServices } from './services';

const AddOrder = TryCatch(async (req, res) => {
  const orderId = await OrderServices.AddOrder(req.user._id, req.body);

  return SendSuccessResponse(res, {
    message: 'Order Added Successfully',
    data: { orderId },
    status: 200,
  });
});

const GetSingleOrder = TryCatch(async (req, res) => {
  const { orderId } = req.params;
  const orderData = await OrderServices.GetSingleOrder(
    orderId,
    req.user.role,
    req.user._id
  );

  return SendSuccessResponse(res, {
    message: 'Order Retrieved',
    data: orderData,
    status: 200,
  });
});

const GetAllOrders = TryCatch(async (req, res) => {
  const allOrders = await OrderServices.GetAllOrders(
    req.user._id,
    req.user.role
  );

  return SendSuccessResponse(res, {
    message: 'All Order Retrieved',
    data: allOrders,
    status: 200,
  });
});

const GetMonthlyOrders = TryCatch(async (req, res) => {
  const monthlyOrders = await OrderServices.GetMonthlyOrders(
    req.user._id,
    req.user.role
  );

  return SendSuccessResponse(res, {
    message: 'Monthly Orders Retrieved',
    data: monthlyOrders,
    status: 200,
  });
});

const GetWeeklyOrders = TryCatch(async (req, res) => {
  const weeklyOrders = await OrderServices.GetWeeklyOrders(
    req.user._id,
    req.user.role
  );

  return SendSuccessResponse(res, {
    message: 'Weekly Orders Retrieved',
    data: weeklyOrders,
    status: 200,
  });
});

const GetDailyOrders = TryCatch(async (req, res) => {
  const dailyOrders = await OrderServices.GetDailyOrders(
    req.user._id,
    req.user.role
  );

  return SendSuccessResponse(res, {
    message: 'Daily Orders Retrieved',
    data: dailyOrders,
    status: 200,
  });
});

const GetYearlyOrders = TryCatch(async (req, res) => {
  const yearlyOrders = await OrderServices.GetYearlyOrders(
    req.user._id,
    req.user.role
  );

  return SendSuccessResponse(res, {
    message: 'Yearly Orders Retrieved',
    data: yearlyOrders,
    status: 200,
  });
});

export const OrderController = {
  AddOrder,
  GetMonthlyOrders,
  GetSingleOrder,
  GetAllOrders,
  GetWeeklyOrders,
  GetDailyOrders,
  GetYearlyOrders,
};
