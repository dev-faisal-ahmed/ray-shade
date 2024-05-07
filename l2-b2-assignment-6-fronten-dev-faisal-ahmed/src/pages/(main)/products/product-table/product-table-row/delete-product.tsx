import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { useDeleteProductMutation } from '@/redux/api/product-api';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

type DeleteProductProps = {
  _id: string;
};

export function DeleteProduct({ _id }: DeleteProductProps) {
  const [open, setOpen] = useState(false);
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async () => {
    const toastId = toast.loading('Deleting the product');
    try {
      const response = await deleteProduct(_id).unwrap();
      console.log(response);
      if (!response.ok) throw new Error(response.message);
      toast.success(response.message);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error('Something Went wrong');
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className='hover:scale-10 block rounded bg-error-700 p-[6px] text-white transition'>
          <Trash size={16} />
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
          <Button onClick={handleDelete}>Proceed</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
