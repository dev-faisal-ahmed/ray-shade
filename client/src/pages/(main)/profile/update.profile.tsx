import {
  UpdateProfileSchema,
  UpdateProfileSchemaType,
} from '@/lib/schema/update-profile-validation';
import * as Dialog from '@/components/ui/dialog';
import { Input } from '@/components/shared/form/input';
import { TextArea } from '@/components/shared/form/textarea';
import { Button } from '@/components/ui/button';
import { useUpdateMyInfoMutation } from '@/redux/api/auth-api';
import { zodResolver } from '@hookform/resolvers/zod';
import { PencilLineIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { setTokenToLocal } from '@/lib/helper/token-helper';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { loginUser } from '@/redux/slices/user-slice';

export function UpdateProfile() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [updateMyInfo] = useUpdateMyInfoMutation();
  const { _id, name, phone, address } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState } =
    useForm<UpdateProfileSchemaType>({
      resolver: zodResolver(UpdateProfileSchema),
      defaultValues: { name, address, phone },
    });

  const { errors } = formState;

  const onEditProfile = handleSubmit(async (data) => {
    try {
      setIsLoading(true);

      const response = await updateMyInfo({
        id: _id,
        payload: {
          address: data.address || '',
          name: data.name,
          phone: data.phone || '',
        },
      }).unwrap();

      if (!response.ok) throw new Error(response.message);
      toast.success(response.message);

      console.log(response);

      const token = response.data?.token;
      setTokenToLocal(token as string);
      dispatch(loginUser(token as string));
      setIsOpenModal(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <Dialog.Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <Dialog.DialogTrigger asChild>
        <Button className='flex gap-3'>
          Edit Profile
          <PencilLineIcon size={18} />
        </Button>
      </Dialog.DialogTrigger>
      <Dialog.DialogContent>
        <Dialog.DialogTitle>Edit Profile</Dialog.DialogTitle>
        <form onSubmit={onEditProfile} className='flex flex-col gap-4'>
          <Input
            name='name'
            label='Name'
            placeholder='Input Your Name'
            type='text'
            error={errors.name}
            register={register}
            required
          />

          <Input
            name='phone'
            label='Phone'
            placeholder='Input Your Phone Number'
            type='text'
            error={errors.phone}
            register={register}
            required
          />

          <TextArea
            name='address'
            label='Address'
            placeholder='Input Your Address'
            error={errors.phone}
            register={register}
            required
          />

          <Button disabled={loading} className='mt-3'>
            Edit Profile
          </Button>
        </form>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
}
