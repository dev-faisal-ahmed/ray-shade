import { jwtSecret } from '../../../config/config';
import { AuthModel } from '../auth-model';
import { UpdateUserPayloadType } from '../auth-validation';
import jwt from 'jsonwebtoken';

export async function UpdateUser(
  userId: string,
  payload: UpdateUserPayloadType
) {
  const user = await AuthModel.findOneAndUpdate(
    { _id: userId },
    { $set: payload }
  );

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
