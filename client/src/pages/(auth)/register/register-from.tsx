import toast from 'react-hot-toast';
import { Input } from '@/components/shared/form/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { registerData } from '../../../lib/data/form-data/register-data';
import { useRegisterMutation } from '@/redux/api/auth-api';
import { useNavigate } from 'react-router-dom';
import { RegisterSchemaType } from '@/lib/schema/register-validation';

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RegisterSchemaType>();
  const [userRegister] = useRegisterMutation();
  const navigate = useNavigate();

  const handleRegister = handleSubmit(async (data) => {
    const name = data.firstName.trim() + ' ' + data.lastName.trim();
    const email = data.email.trim();
    const password = data.password;
    const confirmedPassword = data.confirmPassword;

    // when password does not match
    if (password !== confirmedPassword) {
      toast.error('Password Does not match');
      setError('confirmPassword', { message: '' });
      setValue('confirmPassword', '');
      return;
    }

    // making an object to send data to server
    const payload = {
      name,
      email,
      password,
    };

    const toastId = toast.loading('Registering');

    try {
      const response = await userRegister(payload).unwrap();
      if (!response.ok) {
        toast.error(response.message);
        throw new Error(response.message);
      }

      toast.success(response.message);
      navigate('/login');
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      toast.error('Something Went Wrong');
    } finally {
      toast.dismiss(toastId);
      reset();
    }
  });

  return (
    <form
      onSubmit={handleRegister}
      className='mx-auto mt-8 flex w-full flex-col gap-3'
    >
      {/* for name */}
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5'>
        <Input
          {...registerData.firstName}
          register={register}
          error={errors.firstName}
          required
        />
        <Input
          {...registerData.lastName}
          error={errors.lastName}
          register={register}
          required
        />
      </div>

      {/* for email */}
      <Input
        {...registerData.email}
        register={register}
        error={errors.email}
        required
      />

      {/* for password */}
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5'>
        <Input
          {...registerData.password}
          error={errors.password}
          register={register}
          required
        />
        <Input
          {...registerData.confirmPassword}
          error={errors.confirmPassword}
          register={register}
          required
        />
      </div>
      <Button className='mt-3 w-full text-white'>Register</Button>
    </form>
  );
}
