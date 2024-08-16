import { AppError } from '../../../utils/app-error';
import { AuthModel } from '../auth-model';
import { AuthLoginPayloadType } from '../auth-validation';
import { jwtSecret } from '../../../config/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function Login(payload: AuthLoginPayloadType) {
  const { email, password } = payload;

  // checking if user exist
  const user = await AuthModel.findOne(
    { email },
    { _id: 1, name: 1, email: 1, password: 1, role: 1 }
  );

  // if no user found
  if (!user) throw new AppError('User Not Found', 404);

  // matching password
  const isPasswordMatched = await bcrypt.compare(password, user.password);

  // if password does not match
  if (!isPasswordMatched) throw new AppError('Password Does Not Match', 401);

  // making a token
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      address: user.address,
    },

    jwtSecret,
    { expiresIn: '30d' }
  );

  return token;
}
