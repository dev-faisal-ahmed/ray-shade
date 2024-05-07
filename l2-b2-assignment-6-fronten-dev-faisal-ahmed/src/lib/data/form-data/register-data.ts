import { FieldType } from '@/lib/types/props-types';

type FormFieldType = {
  firstName: FieldType;
  lastName: FieldType;
  email: FieldType;
  password: FieldType;
  confirmPassword: FieldType;
};

export const registerData: FormFieldType = {
  firstName: {
    label: 'First Name',
    name: 'firstName',
    type: 'text',
    placeholder: 'Input Your First Name',
  },
  lastName: {
    label: 'Last Name',
    name: 'lastName',
    type: 'text',
    placeholder: 'Input Your Last Name',
  },

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
  confirmPassword: {
    label: 'Confirm Password',
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm Password',
  },
};
