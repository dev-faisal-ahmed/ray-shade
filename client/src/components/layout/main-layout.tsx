import { useAppSelector } from '@/redux/hook';
import { Navigate, Outlet } from 'react-router-dom';
import { Sidebar } from '../shared/sidebar/sidebar';
import { Topbar } from '../shared/topbar/topbar';

export function MainLayout() {
  const { email } = useAppSelector((state) => state.user);

  if (!email) {
    return <Navigate to={'/login'} />;
  }

  return (
    <section className='grid md:grid-cols-[auto_1fr]'>
      <Sidebar className='hidden shadow-md md:block' />
      <section className='grid h-screen grid-rows-[auto_1fr]'>
        <Topbar />
        <main className='customized_scrollbar h-full overflow-y-auto px-5'>
          <Outlet />
        </main>
      </section>
    </section>
  );
}
