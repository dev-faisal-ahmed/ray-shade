import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('/')}
      className={cn('flex cursor-pointer gap-1 text-lg font-bold', className)}
    >
      <div className='rounded-s bg-primary-600 px-3 py-1 text-white'>Ray</div>{' '}
      <div className='border-y-2 px-2 py-1 text-primary-600'>Shades</div>
    </div>
  );
}
