/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  GenderType,
  LensSizeType,
  ObjectType,
  ProductType,
} from '@/lib/types/data-types';
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
import { useUpdateProductMutation } from '@/redux/api/product-api';
import { zodResolver } from '@hookform/resolvers/zod';
import { FilePenLine, Upload, X } from 'lucide-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { colorObjectMaker } from '@/lib/helper/utility-helper';

export function UpdateProduct(product: ProductType) {
  const {
    _id,
    image: preViousImage,
    name,
    price,
    quantity,
    material,
    brand,
    shape,
    lensType,
    bridgeLength,
    gender: preViousGender,
    lensSize: previousLensSize,
    colors,
  } = product;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductValidationSchema),
  });

  const [updateProduct] = useUpdateProductMutation();

  let imageChanged = false;
  const imageRef = useRef<HTMLInputElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [imageFile, setImageFile] = useState(preViousImage);
  const [gender, setGender] = useState<GenderType | ''>(preViousGender);
  const [lensSize, setLesSize] = useState<LensSizeType | ''>(previousLensSize);
  const [colorObject, setColorObject] = useState<ObjectType<string>>(
    colorObjectMaker(colors),
  );

  const onGenderChange = (value: string) => setGender(value as GenderType);
  const onLensChange = (value: string) => setLesSize(value as LensSizeType);

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
    imageChanged = true;
  };

  const handleUpdateProduct = handleSubmit(async (data) => {
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
      let imageData;
      if (imageChanged) {
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
      const image = imageData?.data.url || preViousImage;
      const price = Number(data.price);
      const quantity = Number(data.quantity);
      const material = data.material;
      const shape = data.shape;
      const lensType = data.lensType;
      const brand = data.brand;
      const bridgeLength = Number(data.bridgeLength);

      toast.loading('Adding Products', { id: toastId });
      const response = await updateProduct({
        _id,
        name,
        image,
        price,
        quantity,
        material,
        shape,
        lensSize,
        lensType,
        brand,
        bridgeLength,
        colors,
        gender,
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
      setOpenDialog(false);
    }
  });

  const setDefault = () => {
    setImageFile(preViousImage);
    setValue('name', name);
    setValue('price', price.toString());
    setValue('quantity', quantity.toString());
    setValue('material', material);
    setValue('brand', brand);
    setValue('shape', shape);
    setValue('lensType', lensType);
    setValue('bridgeLength', bridgeLength.toString());
    setGender(preViousGender);
    setLesSize(previousLensSize);
    setColorObject(colorObjectMaker(colors));
  };

  useEffect(() => {
    setDefault();
  }, [openDialog]);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <span className='hover:scale-10 block rounded bg-blue-500 p-[6px] text-white transition'>
          <FilePenLine size={16} />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h1 className='font-semibold'>Update Product</h1>
        </DialogHeader>
        <form
          onSubmit={handleUpdateProduct}
          className='customized_scrollbar max-h-[450px] w-full overflow-y-auto rounded-md px-3'
        >
          <div className='relative mb-5 h-fit cursor-pointer'>
            {/* image uploader and image shower */}
            <label htmlFor='image'>
              <div className='h-[300px] overflow-hidden rounded-md'>
                {imageFile ? (
                  <img className='h-full w-full object-cover' src={imageFile} />
                ) : (
                  <div className='flex h-full cursor-pointer flex-col items-center justify-center bg-slate-100 shadow'>
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

          <div className='flex flex-col gap-5 rounded-md'>
            <Input
              {...ProductFromData.name}
              defaultValue={name}
              register={register}
              error={errors.name}
            />
            <Input
              {...ProductFromData.price}
              defaultValue={price.toString()}
              register={register}
              error={errors.price}
            />
            <Input
              {...ProductFromData.quantity}
              defaultValue={quantity.toString()}
              register={register}
              error={errors.quantity}
            />
            <Input
              {...ProductFromData.material}
              defaultValue={material}
              register={register}
              error={errors.material}
            />
            <Input
              {...ProductFromData.brand}
              defaultValue={brand}
              register={register}
              error={errors.brand}
            />
            <Input
              {...ProductFromData.shape}
              defaultValue={shape}
              register={register}
              error={errors.shape}
            />
            <Input
              {...ProductFromData.lensType}
              defaultValue={lensType}
              register={register}
              error={errors.lensType}
            />
            <Input
              {...ProductFromData.bridgeLength}
              defaultValue={bridgeLength.toString()}
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
      </DialogContent>
    </Dialog>
  );
}
