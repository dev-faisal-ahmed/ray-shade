import toast from 'react-hot-toast';
import { useBulkDeleteMutation } from '@/redux/api/product-api';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { Trash } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { bulkDeSelectAll } from '@/redux/slices/product-slice';

export function BulkDelete() {
  const { bulkedProduct } = useAppSelector((state) => state.product);
  const [bulkDelete] = useBulkDeleteMutation();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleBulkDelete = async () => {
    const toastId = toast.loading('Deleting Selected Items');
    try {
      // making an array of product Id's
      const productIds = Object.keys(bulkedProduct).reduce(
        (ids: string[], productId) => {
          ids.push(productId);
          return ids;
        },
        [],
      );

      // sending req
      const response = await bulkDelete({ productIds }).unwrap();
      if (!response.ok) throw new Error(response.message);
      toast.success(response.message);
      dispatch(bulkDeSelectAll());
      setOpen(false);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) toast.error(error.message);
      else toast.error('Something Went Wrong');
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className='ml-auto block cursor-pointer rounded-md bg-error-700 p-2 text-white'>
          <Trash size={18} />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are You Sure?</DialogTitle>
        </DialogHeader>
        <div className='ml-auto w-fit space-x-4'>
          <DialogClose asChild>
            <Button variant={'ghost'}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleBulkDelete}>Proceed</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
