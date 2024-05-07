/* eslint-disable @typescript-eslint/no-explicit-any */
export type GenderType = 'male' | 'female';
export type LensSizeType = 'xs' | 'sm' | 'lg' | 'xl';
export type UserRoleType = 'USER' | 'MANAGER';

export type ServerResponseType<DataType> = {
  data?: DataType;
  error?: any;
  message: string;
  ok: boolean;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  role: UserRoleType;
};

export type ProductType = {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  material: string;
  shape: string;
  lensType: string;
  brand: string;
  gender: GenderType;
  colors: string[];
  lensSize: LensSizeType;
  bridgeLength: number;
};

export type ObjectType<DataType> = {
  [key: string]: DataType;
};

export type OrderType = {
  _id: string;
  name: string;
  quantity: number;
  date: string;
  price: number;
  productId: {
    name: string;
    image: string;
  };
};

export type FilterQueryType = {
  name: string;
  brand: string;
  lensType: string;
  material: string;
  shape: string;
  bridgeLength: string;
  color: string;
  maxPrice: string;
  minPrice: string;
  gender: string;
  lensSize: string;
};
