import {
  CopyPlus,
  FileStack,
  LayoutDashboard,
  ShoppingBasket,
  UserIcon,
} from 'lucide-react';

export const navLinks = [
  {
    title: 'Dashboard',
    url: '/',
    icon: <LayoutDashboard />,
  },
  {
    title: 'Products',
    url: '/products',
    icon: <ShoppingBasket />,
  },
  {
    title: 'Add Products',
    url: '/products/add',
    icon: <CopyPlus />,
  },
  {
    title: 'Sales History',
    url: '/sales',
    icon: <FileStack />,
  },
  {
    title: 'Profile',
    url: '/profile',
    icon: <UserIcon />,
  },
];
