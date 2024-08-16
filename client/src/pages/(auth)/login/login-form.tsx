/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LoginSchemaType,
  LoginValidationSchema,
} from '../../../lib/schema/login-validation';
import toast from 'react-hot-toast';
import { Input } from '@/components/shared/form/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '@/redux/api/auth-api';
import { useNavigate } from 'react-router-dom';
import { loginData } from '../../../lib/data/form-data/login-data';
import { setTokenToLocal } from '@/lib/helper/token-helper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/redux/hook';
import { loginUser } from '@/redux/slices/user-slice';
import { useEffect, useState } from 'react';
import { DemoAccountModal } from './demo-account-modal';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginValidationSchema),
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (email) setValue('email', email);
    if (password) setValue('password', password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  // handlers
  const onEmailChange = (email: string) => setEmail(email);
  const onPasswordChange = (password: string) => setPassword(password);

  const handleRegister = handleSubmit(async (data) => {
    const email = data.email.trim();
    const password = data.password;

    // making an object to send data to server
    const payload = {
      email,
      password,
    };

    const toastId = toast.loading('Logging in...');

    try {
      const response = await login(payload).unwrap();
      if (!response.ok) {
        toast.error(response.message);
        throw new Error('');
      }

      toast.success(response.message);
      const token = response.data?.token;
      setTokenToLocal(token as string);
      dispatch(loginUser(token as string));
      reset();
      navigate('/');
    } catch (error: any) {
      console.log(error);
      if (error) toast.error(error.data?.message);
    } finally {
      toast.dismiss(toastId);
    }
  });

  return (
    <form
      onSubmit={handleRegister}
      className='mx-auto mt-8 flex w-full flex-col gap-2'
    >
      <Input
        {...loginData.email}
        register={register}
        error={errors.email}
        required
      />
      <Input
        {...loginData.password}
        error={errors.password}
        register={register}
        required
      />
      <DemoAccountModal
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
      />
      <Button className='mt-3 w-full text-white'>Login</Button>
    </form>
  );
}
