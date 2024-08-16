import { useAppSelector } from '@/redux/hook';
import { MailOpenIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import { UpdateProfile } from './update.profile';

export default function ProfilePage() {
  const { email, name, phone, address } = useAppSelector((state) => state.user);

  return (
    <>
      <section className='rounded bg-neutral-50 pb-6'>
        <img
          className='h-[150px] w-full rounded-t-md md:h-[250px]'
          src={'/images/auth-banner.png'}
          alt='banner'
        />

        <div className='-mt-4 flex flex-col px-6 md:ml-12 md:gap-6 lg:flex-row'>
          <div className='flex'></div>
          <div className='mx-auto flex size-40 items-center justify-center rounded-full border-[6px] border-neutral-300 bg-primary text-5xl font-semibold text-white lg:mx-0'>
            {name[0]}
          </div>

          <div className='mx-auto mt-8 py-3 text-center md:text-left lg:mx-0'>
            <h3 className='text-2xl font-semibold'>{name}</h3>
            <div>
              <p className='mt-1 flex  items-center gap-2 text-neutral-600'>
                <MailOpenIcon size={16} />
                {email}
              </p>

              {phone && (
                <p className='mt-1 flex w-full items-center gap-2 text-neutral-600'>
                  <PhoneIcon size={16} />
                  {phone}
                </p>
              )}

              {address && (
                <p className='mt-1 flex w-full items-center gap-2 text-neutral-600'>
                  <MapPinIcon size={16} />
                  {address}
                </p>
              )}
            </div>
          </div>
          <div className='mx-auto mt-auto lg:mx-0 lg:ml-auto'>
            <UpdateProfile />
          </div>
        </div>
      </section>
    </>
  );
}
