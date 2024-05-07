import { Link } from 'react-router-dom';
import { RegisterForm } from './register-from';

export default function RegisterPage() {
  return (
    <section className='flex min-h-screen items-center justify-center'>
      <div className='mx-auto w-full max-w-[450px] rounded-md p-10 shadow-none sm:bg-slate-100 sm:shadow-md'>
        <div className='text-center'>
          <h1 className='mb-2 text-lg font-semibold sm:text-2xl'>Register</h1>
          <p className='text-sm text-gray-600 sm:text-base'>
            Let's get started With Email
          </p>
          <div className='mt-1 text-sm text-primary-400'>
            <span className='text-primary-400'>Already have an account?</span>{' '}
            <Link to='/login'>Login</Link>
          </div>
        </div>
        <RegisterForm />
      </div>
    </section>
  );
}
