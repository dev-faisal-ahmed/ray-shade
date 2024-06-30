import { FieldType } from '@/lib/types/props-types';

type FormFieldType = {
  name: FieldType;
  image: FieldType;
  price: FieldType;
  quantity: FieldType;
  material: FieldType;
  shape: FieldType;
  lensType: FieldType;
  brand: FieldType;
  bridgeLength: FieldType;
};

export const ProductFromData: FormFieldType = {
  name: {
    label: 'Product Name',
    name: 'name',
    placeholder: 'Input Name',
    type: 'text',
  },
  image: {
    label: 'Image',
    name: 'image',
    placeholder: 'Insert Image',
    type: 'file',
  },
  price: {
    label: 'Price',
    name: 'price',
    placeholder: 'Input Price',
    type: 'number',
  },
  quantity: {
    label: 'Product Quantity',
    name: 'quantity',
    placeholder: 'Input Quantity',
    type: 'number',
  },
  material: {
    label: 'Product Material',
    name: 'material',
    placeholder: 'Input Material',
    type: 'text',
  },
  shape: {
    label: 'Shape',
    name: 'shape',
    placeholder: 'Input Shape',
    type: 'text',
  },
  lensType: {
    label: 'Lense Type',
    name: 'lensType',
    placeholder: 'Input Lens Type',
    type: 'text',
  },
  brand: {
    label: 'Brand',
    name: 'brand',
    placeholder: 'Input Brand',
    type: 'text',
  },
  bridgeLength: {
    label: 'Bridge Length',
    name: 'bridgeLength',
    placeholder: 'Input Bridge Length in mm',
    type: 'number',
  },
};
