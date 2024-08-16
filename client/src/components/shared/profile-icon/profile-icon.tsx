import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { removeToken } from '@/lib/helper/token-helper';
import { useAppDispatch } from '@/redux/hook';
import { logOutUser } from '@/redux/slices/user-slice';
import { useNavigate } from 'react-router-dom';

type ProfileIconProps = {
  name: string;
  image?: string;
  size?: string;
  email?: string;
};

export function ProfileIcon({
  name,
  image,
  size = '40px',
  email,
}: ProfileIconProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    removeToken();
    dispatch(logOutUser());
    navigate('/login');
  };
  return (
    <div className='flex items-center gap-3'>
      <h2 className='text-lg font-semibold'>{name}</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className='flex cursor-pointer items-center justify-center rounded-full'
            style={{ width: size, height: size, backgroundColor: '#075e54' }}
          >
            {image ? (
              <img src={image} alt={name} />
            ) : (
              <p className='text-xl font-bold text-white'>{name[0]}</p>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align='end' className='min-w-52'>
          <DropdownMenuLabel>
            <h1 className='text-lg font-semibold'>{name}</h1>
            <p>{email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Button onClick={handleLogOut} className='w-full'>
            LogOut
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
