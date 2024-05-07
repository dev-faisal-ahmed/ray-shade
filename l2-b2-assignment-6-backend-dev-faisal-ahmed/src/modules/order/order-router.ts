import { Router } from 'express';
import { AuthGuard } from '../../middleware/auth-guard';
import { ValidationHandler } from '../../middleware/validation-handler';
import { OrderValidation } from './order-validation';
import { OrderController } from './order-controller';

export const OrderRouter = Router();

OrderRouter.post(
  '/',
  AuthGuard(),
  ValidationHandler(OrderValidation.AddOrderValidationSchema),
  OrderController.AddOrder
);

OrderRouter.get('/', AuthGuard(), OrderController.GetAllOrders);
OrderRouter.get('/daily', AuthGuard(), OrderController.GetDailyOrders);
OrderRouter.get('/weekly', AuthGuard(), OrderController.GetWeeklyOrders);
OrderRouter.get('/monthly', AuthGuard(), OrderController.GetMonthlyOrders);
OrderRouter.get('/yearly', AuthGuard(), OrderController.GetYearlyOrders);
OrderRouter.get('/:orderId', AuthGuard(), OrderController.GetSingleOrder);
