import {
  useAddProductMutation,
  useGetProductByIdQuery,
} from '@/redux/api/product-api';
import {
  ProductSchemaType,
  ProductValidationSchema,
} from '@/lib/schema/product-validation';
import toast from 'react-hot-toast';
import { ComboInput } from '@/components/shared/form/combo-input';
import { CustomSelect } from '@/components/shared/form/custom-select';
import { Input } from '@/components/shared/form/input';
import { Button } from '@/components/ui/button';
import { imageBBApiKey } from '@/config/config';
import { genders, lensesSize } from '@/lib/data/all-constants';
import { ProductFromData } from '@/lib/data/form-data/product-data';
import { GenderType, LensSizeType, ObjectType } from '@/lib/types/data-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, X } from 'lucide-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { colorObjectMaker } from '@/lib/helper/utility-helper';
import { Loader } from '@/components/shared/loader';
import { useNavigate } from 'react-router-dom';

type ProductDuplicateEditProps = {
  productId: string;
};
export function ProductDuplicateEdit({ productId }: ProductDuplicateEditProps) {
  const { data: productData, isLoading } = useGetProductByIdQuery(productId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductValidationSchema),
  });

  const [addProduct] = useAddProductMutation();
  const navigate = useNavigate();

  const imageRef = useRef<HTMLInputElement>(null);
  const imageChanged = useRef(false);
  const [imageFile, setImageFile] = useState(productData?.data?.image || '');
  const [gender, setGender] = useState(productData?.data?.gender || '');
  const [lensSize, setLesSize] = useState(productData?.data?.lensSize || '');
  const [colorObject, setColorObject] = useState<ObjectType<string>>(
    colorObjectMaker(productData?.data?.colors || []),
  );

  useEffect(() => {
    if (!imageChanged.current) {
      setImageFile(productData?.data?.image || '');
    }
    setColorObject(colorObjectMaker(productData?.data?.colors || []));
    setGender(productData?.data?.gender || '');
    setLesSize(productData?.data?.lensSize || '');
  }, [productData?.data]);

  if (!productData?.data) {
    return (
      <div className='text-center font-semibold'>
        No Product Found With The Given ID
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='mx-auto mt-5 w-fit'>
        <Loader />
      </div>
    );
  }

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
    imageChanged.current = true;
  };

  const handleAddProduct = handleSubmit(async (data) => {
    const toastId = toast.loading('Wait for a while...');
    console.log(imageChanged);
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
      let imageData;
      if (imageChanged.current) {
        const imageForm = new FormData();
        imageForm.append('image', imageTarget?.files?.[0] as File);
        const url = `https://api.imgbb.com/1/upload?key=${imageBBApiKey}`;
        const imageBBResponse = await fetch(url, {
          method: 'POST',
          body: imageForm,
        });

        imageData = await imageBBResponse.json();
        if (!imageData.success) throw new Error('Failed to upload the image');

        //  if image is uploaded
        toast.success('Image Uploaded');
      }

      // converting colors into a string
      const colors = Object.keys(colorObject).reduce(
        (color: string[], key: string) => {
          color.push(key);
          return color;
        },
        [],
      );

      const name = data.name;
      const image = imageData?.data?.url || imageFile;
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
      navigate('/products');
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error('Something went wrong');
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
            className='absolute right-2 top-2 rounded text-white'
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
          defaultValue={productData?.data?.name || ''}
        />
        <Input
          {...ProductFromData.price}
          register={register}
          error={errors.price}
          defaultValue={productData?.data?.price?.toString() || ''}
        />
        <Input
          {...ProductFromData.quantity}
          register={register}
          error={errors.quantity}
          defaultValue={productData?.data?.quantity?.toString() || ''}
        />
        <Input
          {...ProductFromData.material}
          register={register}
          error={errors.material}
          defaultValue={productData?.data?.material || ''}
        />
        <Input
          {...ProductFromData.brand}
          register={register}
          error={errors.brand}
          defaultValue={productData?.data?.brand || ''}
        />
        <Input
          {...ProductFromData.shape}
          register={register}
          error={errors.shape}
          defaultValue={productData?.data?.shape || ''}
        />
        <Input
          {...ProductFromData.lensType}
          register={register}
          error={errors.lensType}
          defaultValue={productData?.data?.lensType || ''}
        />
        <Input
          {...ProductFromData.bridgeLength}
          register={register}
          error={errors.bridgeLength}
          defaultValue={productData?.data?.bridgeLength?.toString() || ''}
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
