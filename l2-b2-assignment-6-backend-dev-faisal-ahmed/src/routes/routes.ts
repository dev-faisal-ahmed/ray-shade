import { Router } from 'express';
import { AuthRouter } from '../modules/auth/auth-router';
import { ProductRouter } from '../modules/products/product-router';
import { OrderRouter } from '../modules/order/order-router';

export const router = Router();

router.use('/auth', AuthRouter);
router.use('/products', ProductRouter);
router.use('/orders', OrderRouter);
