import { FieldType } from '@/lib/types/props-types';

type FormFieldType = {
  name: FieldType;
  quantity: FieldType;
  date: FieldType;
};

export const sellData: FormFieldType = {
  name: {
    label: 'Name',
    name: 'name',
    placeholder: "Input Customer's name",
    type: 'text',
  },
  quantity: {
    label: 'Quantity',
    name: 'quantity',
    placeholder: 'Input Quantity',
    type: 'number',
  },
  date: {
    label: 'Date',
    name: 'date',
    placeholder: 'Input Quantity',
    type: 'date',
  },
};
