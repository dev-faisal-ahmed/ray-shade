import { FieldType } from '@/lib/types/props-types';

type FormFieldType = {
  email: FieldType;
  password: FieldType;
};

export const loginData: FormFieldType = {
  email: {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Input Your Email',
  },
  password: {
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: 'Input Password',
  },
};
