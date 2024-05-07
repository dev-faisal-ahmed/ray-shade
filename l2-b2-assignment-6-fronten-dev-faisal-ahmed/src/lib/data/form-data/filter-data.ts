import { FieldType } from '@/lib/types/props-types';

type FormFieldType = {
  name: FieldType;
  material: FieldType;
  shape: FieldType;
  lensType: FieldType;
  brand: FieldType;
  maxPrice: FieldType;
  minPrice: FieldType;
  color: FieldType;
  bridgeLength: FieldType;
};

export const filterData: FormFieldType = {
  name: {
    label: 'Name',
    name: 'name',
    placeholder: 'Input Name',
    type: 'text',
  },
  material: {
    label: 'Material',
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
    label: 'Lens Type',
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
  maxPrice: {
    label: 'Max Price',
    name: 'maxPrice',
    placeholder: 'Input Maximum Price',
    type: 'number',
  },
  minPrice: {
    label: 'Min Price',
    name: 'minPrice',
    placeholder: 'Input Minimum Price',
    type: 'number',
  },
  color: {
    label: 'Color',
    name: 'color',
    placeholder: 'Input Color',
    type: 'text',
  },
  bridgeLength: {
    label: 'Bridge Length',
    name: 'bridgeLength',
    placeholder: 'Input Bridge Length',
    type: 'number',
  },
};
