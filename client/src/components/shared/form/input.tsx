/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputTypesType } from '@/lib/types/props-types';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { cn } from '@/lib/utils';

type InputProps = {
  label: string;
  type: InputTypesType;
  name: string;
  placeholder: string;
  defaultValue?: string;
  className?: string;
  required?: boolean;
  error?: FieldError;
  register: UseFormRegister<any>;
};

export function Input({
  label,
  name,
  type,
  placeholder,
  defaultValue,
  className,
  error,
  register,
}: InputProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label className='font-semibold' htmlFor={name}>
        {label}
      </label>
      <input
        className={cn(
          'w-full rounded-md border border-primary-100 bg-transparent px-3 py-1 text-primary-700 outline-none ring-border placeholder:text-sm focus:border-border focus:ring-1',
          error
            ? 'border-error-600 ring-error-600 focus:border-error-600 focus:ring-1'
            : null,
        )}
        id={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name)}
      />
      {error?.message && (
        <p className='mt-1 block w-full rounded bg-error-50 px-2 py-[2px] text-xs text-error-600'>
          {error.message}
        </p>
      )}
    </div>
  );
}
