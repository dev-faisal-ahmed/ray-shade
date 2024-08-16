import { Router } from 'express';
import { ValidationHandler } from '../../middleware/validation-handler';
import { AuthValidation } from './auth-validation';
import { AuthController } from './auth-controller';
import { AuthGuard } from '../../middleware/auth-guard';

export const AuthRouter = Router();

AuthRouter.post(
  '/register',
  ValidationHandler(AuthValidation.AuthRegisterSchema),
  AuthController.Register
);

AuthRouter.post(
  '/login',
  ValidationHandler(AuthValidation.AuthLoginSchema),
  AuthController.Login
);

AuthRouter.patch(
  '/update',
  ValidationHandler(AuthValidation.UpdateUserSchema),
  AuthController.UpdateUser
);

AuthRouter.get('/mine', AuthGuard, AuthController.GetMyInfo);
