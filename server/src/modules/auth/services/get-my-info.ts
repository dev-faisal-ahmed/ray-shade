import { AuthModel } from '../auth-model';

export async function GetMyInfo(userId: string) {
  const user = await AuthModel.findOne({ _id: userId });
  return user;
}
