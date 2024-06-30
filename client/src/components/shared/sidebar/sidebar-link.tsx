import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type SidebarLinkProps = {
  title: string;
  url: string;
  icon: ReactNode;
  currentUrl: string;
};

export function SidebarLink({
  title,
  url,
  icon,
  currentUrl,
}: SidebarLinkProps) {
  return (
    <Link
      className={cn(
        `flex gap-3 rounded-md py-2 pl-3 pr-16 text-sm transition-colors duration-300 hover:bg-primary-400 hover:text-white`,
        currentUrl === url ? 'bg-primary-600 text-white' : null,
      )}
      to={url}
    >
      {icon}
      {title}
    </Link>
  );
}
