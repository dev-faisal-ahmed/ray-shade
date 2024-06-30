import { Link } from 'react-router-dom';
import { LoginForm } from './login-form';

export default function LoginPage() {
  return (
    <section className='flex min-h-screen items-center justify-center'>
      <div className='mx-auto w-full max-w-[450px] rounded-md p-10 shadow-none sm:bg-slate-100 sm:shadow-md'>
        <h1 className='mb-2 text-center text-lg font-semibold sm:text-2xl'>
          Login
        </h1>
        <div className='mt-1 text-center text-sm text-primary-400'>
          <span className='text-primary-400'>Don't have account?</span>{' '}
          <Link to='/register'>Registration</Link>
        </div>
        <LoginForm />
      </div>
    </section>
  );
}
