import { AuthModel } from '../auth-model';
import { UpdateUserPayloadType } from '../auth-validation';

export async function UpdateUser(
  userId: string,
  payload: UpdateUserPayloadType
) {
  const user = await AuthModel.findOneAndUpdate(
    { _id: userId },
    { $set: payload }
  );

  return user;
}
