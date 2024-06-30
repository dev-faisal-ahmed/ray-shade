import { Router } from 'express';
import { AuthGuard } from '../../middleware/auth-guard';
import { ValidationHandler } from '../../middleware/validation-handler';
import { ProductValidation } from './products-validation';
import { ProductsController } from './product-controller';

export const ProductRouter = Router();

ProductRouter.get('/', AuthGuard(), ProductsController.GetProducts);

ProductRouter.get(
  '/:productId',
  AuthGuard(),
  ProductsController.GetProductById
);

ProductRouter.post(
  '/',
  AuthGuard(),
  ValidationHandler(ProductValidation.AddProductValidationSchema),
  ProductsController.AddProduct
);

ProductRouter.patch(
  '/:productId',
  AuthGuard(),
  ValidationHandler(ProductValidation.UpdateProductValidationSchema),
  ProductsController.UpdateProduct
);

ProductRouter.delete(
  '/delete/:productId',
  AuthGuard(),
  ProductsController.DeleteProduct
);

ProductRouter.delete(
  '/bulk',
  AuthGuard(),
  ProductsController.DeleteMultipleProducts
);
