import { ProfileIcon } from '../profile-icon/profile-icon';
import { useAppSelector } from '@/redux/hook';
import { AlignJustify } from 'lucide-react';
import { SheetTrigger, Sheet, SheetContent } from '@/components/ui/sheet';
import { Sidebar } from '../sidebar/sidebar';
import { Logo } from '../logo/logo';

export function Topbar() {
  const { name, email, role } = useAppSelector((state) => state.user);
  return (
    <section className='flex items-center justify-between px-5 py-3'>
      <Sheet>
        <SheetTrigger asChild>
          <AlignJustify
            className='block cursor-pointer md:hidden'
            size={24}
            strokeWidth={2}
          />
        </SheetTrigger>
        <SheetContent side={'left'}>
          <Sidebar className='bg-transparent' />
        </SheetContent>
      </Sheet>

      <h1 className='hidden text-lg font-bold md:block'>{role}</h1>
      <Logo className='flex md:hidden' />
      <ProfileIcon name={name} email={email} />
    </section>
  );
}
