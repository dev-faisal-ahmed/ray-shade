import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/shared/form/input';
import { ProductFromData } from '../../../lib/data/form-data/product-data';
import { ChangeEvent, useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { CustomSelect } from '@/components/shared/form/custom-select';
import { genders, lensesSize } from '@/lib/data/all-constants';
import { ComboInput } from '@/components/shared/form/combo-input';
import { Button } from '@/components/ui/button';
import { useAddProductMutation } from '@/redux/api/product-api';
import { imageBBApiKey } from '@/config/config';
import { GenderType, LensSizeType } from '@/lib/types/data-types';
import {
  ProductSchemaType,
  ProductValidationSchema,
} from '../../../lib/schema/product-validation';

export function AddProductForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductValidationSchema),
  });

  const [addProduct] = useAddProductMutation();

  const imageRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState('');
  const [gender, setGender] = useState('');
  const [lensSize, setLesSize] = useState('');
  const [colorObject, setColorObject] = useState<{ [key: string]: string }>({});

  const onGenderChange = (value: string) => setGender(value);
  const onLensChange = (value: string) => setLesSize(value);

  const onAddColorObject = (value: string) => {
    setColorObject((prev) => {
      prev[value] = value;
      return { ...prev };
    });
  };

  const onRemoveColorObject = (value: string) => {
    setColorObject((prev) => {
      delete prev[value];
      return { ...prev };
    });
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imageUrl = URL.createObjectURL(event.target.files?.[0] as File);
    setImageFile(imageUrl);
  };

  const handleAddProduct = handleSubmit(async (data) => {
    const toastId = toast.loading('Wait for a while...');
    try {
      const imageTarget = imageRef.current;
      if (!imageFile || !imageTarget)
        throw new Error('Please Select an image first');

      if (!gender) throw new Error('Please Select the gender');

      if (!lensSize) throw new Error('Please Select Lense Size');

      if (Object.keys(colorObject).length === 0)
        throw new Error('Please Select colors');

      //  loading toast
      toast.loading('Uploading Image', { id: toastId });

      // uploading image
      const imageForm = new FormData();
      imageForm.append('image', imageTarget?.files?.[0] as File);
      const url = `https://api.imgbb.com/1/upload?key=${imageBBApiKey}`;
      const imageBBResponse = await fetch(url, {
        method: 'POST',
        body: imageForm,
      });

      const imageData = await imageBBResponse.json();
      console.log(imageData);
      if (!imageData.success) throw new Error('Failed to upload the image');

      //  if image is uploaded

      toast.success('Image Uploaded');

      // converting colors into a string
      const colors = Object.keys(colorObject).reduce(
        (color: string[], key: string) => {
          color.push(key);
          return color;
        },
        [],
      );

      const name = data.name;
      const image = imageData.data.url;
      const price = Number(data.price);
      const quantity = Number(data.quantity);
      const material = data.material;
      const shape = data.shape;
      const lensType = data.lensType;
      const brand = data.brand;
      const bridgeLength = Number(data.bridgeLength);

      toast.loading('Adding Products', { id: toastId });
      const response = await addProduct({
        name,
        image,
        price,
        quantity,
        material,
        shape,
        lensSize: lensSize as LensSizeType,
        lensType,
        brand,
        bridgeLength,
        colors,
        gender: gender as GenderType,
      }).unwrap();

      if (!response.ok) throw new Error(response.message);
      toast.success(response.message);
      // resetting
      reset();
      setColorObject({});
      setGender('');
      setImageFile('');
      setLesSize('');
    } catch (error) {
      console.log(error);
      if (error instanceof Error) toast.error(error.message);
    } finally {
      toast.dismiss(toastId);
    }
  });

  return (
    <form onSubmit={handleAddProduct} className='my-5 w-full rounded-md'>
      <div className='relative mb-5 h-fit cursor-pointer rounded-md border'>
        {/* image uploader and image shower */}
        <label htmlFor='image'>
          <div className='h-[300px] overflow-hidden rounded-md'>
            {imageFile ? (
              <img className='h-full w-full object-cover' src={imageFile} />
            ) : (
              <div className='flex h-full cursor-pointer flex-col items-center justify-center shadow'>
                <Upload />
                <p className='mt-2'>Upload Image</p>
              </div>
            )}
          </div>
        </label>
        {/* image remover */}
        {imageFile && (
          <div
            onClick={() => setImageFile('')}
            className='absolute right-2 top-2 rounded bg-gray-600/50 text-white'
          >
            <X size={16} strokeWidth={1} />
          </div>
        )}
        {/* image input */}
        <input
          id='image'
          type='file'
          className='hidden w-0'
          ref={imageRef}
          onChange={onImageChange}
        />
      </div>

      <div className='grid h-fit grid-cols-1 gap-5 rounded-md border p-5 md:grid-cols-2 lg:col-span-2'>
        <Input
          {...ProductFromData.name}
          register={register}
          error={errors.name}
        />
        <Input
          {...ProductFromData.price}
          register={register}
          error={errors.price}
        />
        <Input
          {...ProductFromData.quantity}
          register={register}
          error={errors.quantity}
        />
        <Input
          {...ProductFromData.material}
          register={register}
          error={errors.material}
        />
        <Input
          {...ProductFromData.brand}
          register={register}
          error={errors.brand}
        />
        <Input
          {...ProductFromData.shape}
          register={register}
          error={errors.shape}
        />
        <Input
          {...ProductFromData.lensType}
          register={register}
          error={errors.lensType}
        />
        <Input
          {...ProductFromData.bridgeLength}
          register={register}
          error={errors.bridgeLength}
        />
        <CustomSelect
          label='Gender'
          options={genders}
          selectedOption={gender}
          onSelectionChange={onGenderChange}
        />
        <CustomSelect
          label='Size'
          options={lensesSize}
          selectedOption={lensSize}
          onSelectionChange={onLensChange}
        />
        <ComboInput
          className='md:col-span-2'
          label='Colors'
          placeholder='Input Colors'
          selected={colorObject}
          onSelection={onAddColorObject}
          onRemoveSelection={onRemoveColorObject}
        />
        <Button className='font-semibold md:col-span-2'>Submit</Button>
      </div>
    </form>
  );
}
