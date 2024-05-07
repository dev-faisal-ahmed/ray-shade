import { Loader } from '@/components/shared/loader';
import { Logo } from '@/components/shared/logo/logo';
import { Button } from '@/components/ui/button';
import { dateFormatter } from '@/lib/helper/utility-helper';
import { useGetOrderByIdQuery } from '@/redux/api/order-api';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

export default function PaymentSlipPage() {
  const { orderId } = useParams();
  const { data: orderData, isLoading } = useGetOrderByIdQuery(
    orderId as string,
    {
      skip: !orderId,
    },
  );

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Invoice - ${orderData?.data?.productId.name}`,
  });

  if (isLoading)
    return (
      <div className='mx-auto mt-10 w-fit'>
        <Loader />
      </div>
    );

  return (
    <div className='mx-auto max-w-[400px] rounded-md bg-white shadow'>
      <div className='mx-auto w-full p-5 sm:w-[400px]' ref={printRef}>
        <Logo />
        <div className='mt-4 flex flex-col gap-1 border-t border-primary-200 pt-3'>
          <p>
            Buyer Name : &nbsp;
            <span className='font-semibold'>{orderData?.data?.name}</span>
          </p>
          <p>Product Name : &nbsp; {orderData?.data?.productId.name}</p>
          <p>Date : &nbsp; {dateFormatter(orderData?.data?.date as string)}</p>
          <p>Quantity : &nbsp; {orderData?.data?.quantity}</p>
          <p>Price : &nbsp; {orderData?.data?.price || 0}</p>
        </div>
      </div>

      <div className='px-5 pb-5'>
        <Button onClick={handlePrint} className='mt-5 block w-full'>
          Download
        </Button>
      </div>
    </div>
  );
}
