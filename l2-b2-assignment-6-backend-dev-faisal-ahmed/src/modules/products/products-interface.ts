import { Types } from 'mongoose';

type GenderType = 'male' | 'female';
type LensSizeType = 'xs' | 'sm' | 'lg' | 'xl';

export type ProductType = {
  _id: Types.ObjectId;
  name: string;
  addedBy: Types.ObjectId;
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
  isDeleted: boolean;
};
