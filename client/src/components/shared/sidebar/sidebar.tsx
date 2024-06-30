import { navLinks } from '@/lib/data/nav-links';
import { useLocation } from 'react-router-dom';
import { SidebarLink } from './sidebar-link';
import { Logo } from '../logo/logo';
import { cn } from '@/lib/utils';

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  const path = useLocation();
  return (
    <section className={cn('bg-white p-3', className)}>
      <Logo />
      <div className='mt-6 space-y-2'>
        {navLinks.map((link) => (
          <SidebarLink key={link.url} {...link} currentUrl={path.pathname} />
        ))}
      </div>
    </section>
  );
}
