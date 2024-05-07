import toast from 'react-hot-toast';
import { Input } from '@/components/shared/form/input';
import { Button } from '@/components/ui/button';
import { ProductType } from '@/lib/types/data-types';
import { sellData } from '@/lib/data/form-data/sell-data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAddOrderMutation } from '@/redux/api/order-api';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  SellValidationSchema,
  SellValidationSchemaType,
} from '@/lib/schema/sell-validation';

export function ProductSell(product: ProductType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SellValidationSchemaType>({
    resolver: zodResolver(SellValidationSchema),
  });

  const [addOrder] = useAddOrderMutation();
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleSell = handleSubmit(async (formData) => {
    const toastId = toast.loading('Selling Product....');
    try {
      const quantity = Number(formData.quantity);
      if (!formData.date) throw new Error('Select A Date First');

      if (quantity > product.quantity)
        throw new Error('You can not sell more that you have');

      const response = await addOrder({
        productId: product._id,
        name: formData.name,
        quantity,
        price: quantity * product.price,
        date: formData.date,
      }).unwrap();

      if (!response.ok) throw new Error(response.message);
      toast.success(response.message);
      setOpenDialog(false);
      navigate(`/payment-slip/${response?.data?.orderId}`);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      toast.dismiss(toastId);
    }
  });

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button>Sell</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h1 className='font-semibold'>Sell The Product</h1>
        </DialogHeader>

        {/* form */}
        <form
          onSubmit={handleSell}
          className='customized_scrollbar flex max-h-[450px] flex-col gap-5 overflow-y-auto px-3'
        >
          <Input {...sellData.name} error={errors.name} register={register} />
          <Input
            {...sellData.quantity}
            error={errors.quantity}
            register={register}
          />
          <Input {...sellData.date} error={errors.date} register={register} />
          <Button className='mt-2'>Proceed To Sell</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
