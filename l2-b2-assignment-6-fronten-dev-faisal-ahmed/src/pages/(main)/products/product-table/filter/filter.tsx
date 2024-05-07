import { ListFilter } from 'lucide-react';
import { Input } from '@/components/shared/form/input';
import { filterData } from '@/lib/data/form-data/filter-data';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { CustomSelect } from '@/components/shared/form/custom-select';
import { GenderType, LensSizeType } from '@/lib/types/data-types';
import { genders, lensesSize } from '@/lib/data/all-constants';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/redux/hook';
import { updateFilter, updateProducts } from '@/redux/slices/product-slice';
import { useGetAllProductQuery } from '@/redux/api/product-api';
import {
  FilterValidationSchema,
  FilterValidationSchemaType,
} from '@/lib/schema/filter-validation';
import {
  partialSearch,
  partialSearchForArray,
} from '@/lib/helper/utility-helper';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Filter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FilterValidationSchemaType>({
    resolver: zodResolver(FilterValidationSchema),
  });

  const [gender, setGender] = useState('');
  const [lensSize, setLensSize] = useState('');
  const [open, setOpen] = useState(false);
  const { data: products } = useGetAllProductQuery(null);
  const dispatch = useAppDispatch();

  const onGenderChange = (value: string) => setGender(value as GenderType);
  const onLensChange = (value: string) => setLensSize(value as LensSizeType);

  const handleFiltering = handleSubmit((formData) => {
    const {
      name,
      material,
      shape,
      lensType,
      brand,
      color,
      maxPrice,
      minPrice,
    } = formData;

    const filteredProducts =
      products?.data?.filter((product) => {
        if (name && !partialSearch(product.name, name)) return false;
        if (material && !partialSearch(product.material, material))
          return false;
        if (shape && !partialSearch(product.shape, shape)) return false;
        if (lensType && !partialSearch(product.lensType, lensType))
          return false;
        if (brand && !partialSearch(product.brand, brand)) return false;
        if (lensSize && !partialSearch(product.lensSize, lensSize))
          return false;
        if (color && !partialSearchForArray(product.colors, color))
          return false;
        if (maxPrice && product.price > Number(maxPrice)) return false;
        if (minPrice && product.price < Number(minPrice)) return false;
        if (gender && product.gender !== gender) return false;

        return true;
      }) || [];

    dispatch(updateProducts(filteredProducts));
    dispatch(updateFilter(true));
    reset();
    setOpen(false);
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className='flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1'>
          <span className='text-lg'>Filter</span>
          <ListFilter />
        </div>
      </SheetTrigger>
      <SheetContent className='p-4'>
        <SheetHeader>
          <SheetTitle>Filter Options</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={handleFiltering}
          className='customized_scrollbar mt-6 grid max-h-[80vh] grid-cols-2 gap-3 overflow-y-auto p-1'
        >
          <Input
            className='col-span-2'
            {...filterData.name}
            register={register}
            error={errors.name}
            defaultValue=''
          />
          <Input
            {...filterData.material}
            register={register}
            error={errors.material}
            defaultValue=''
          />
          <Input
            {...filterData.shape}
            register={register}
            error={errors.shape}
            defaultValue=''
          />
          <Input
            {...filterData.lensType}
            register={register}
            error={errors.lensType}
            defaultValue=''
          />
          <Input
            {...filterData.minPrice}
            register={register}
            error={errors.minPrice}
            defaultValue={'0'}
          />
          <Input
            {...filterData.maxPrice}
            register={register}
            error={errors.maxPrice}
            defaultValue={'9999'}
          />
          <Input
            {...filterData.brand}
            register={register}
            error={errors.brand}
          />
          <Input
            {...filterData.color}
            register={register}
            error={errors.color}
          />
          <Input
            {...filterData.bridgeLength}
            register={register}
            error={errors.bridgeLength}
            defaultValue='0'
          />
          <CustomSelect
            label='Gender'
            options={genders}
            onSelectionChange={onGenderChange}
            selectedOption={gender}
          />
          <CustomSelect
            label='Lens Size'
            options={lensesSize}
            onSelectionChange={onLensChange}
            selectedOption={lensSize}
          />

          <Button className='col-span-2 mt-5'>Apply Filters</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
