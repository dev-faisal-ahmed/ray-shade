export type InputTypesType =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'file'
  | 'date';
export type FieldType = {
  label: string;
  name: string;
  type: InputTypesType;
  placeholder: string;
  defaultValue?: string;
};
