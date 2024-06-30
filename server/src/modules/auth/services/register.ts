import { AuthRegisterPayloadType } from '../auth-validation';
import { AuthModel } from '../auth-model';
import { salt } from '../../../config/config';
import { AppError } from '../../../utils/app-error';
import bcrypt from 'bcrypt';

export async function Register(payload: AuthRegisterPayloadType) {
  const { password, email } = payload;

  const user = await AuthModel.findOne({ email });
  if (user) throw new AppError('User Already Exist', 409);

  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await AuthModel.create({
    ...payload,
    password: hashedPassword,
  });

  if (!newUser) throw new Error('User can not be created');
  const { password: newPass, ...restData } = newUser.toObject();

  return restData;
}
