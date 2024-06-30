import { Loader } from '@/components/shared/loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { currencyFormate, dateFormatter } from '@/lib/helper/utility-helper';
import { useGetAllOrdersQuery } from '@/redux/api/order-api';

export function RecentOrders() {
  const { data: allOrders, isLoading } = useGetAllOrdersQuery(null);

  if (isLoading) {
    return (
      <div className='flex min-h-20 w-full items-center justify-center rounded-md border bg-white'>
        <Loader />
      </div>
    );
  }

  return (
    <Card className='h-fit w-full'>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent>
        {allOrders?.data && allOrders.data.length > 0 ? (
          <div className='space-y-5'>
            {allOrders.data
              .slice(0, 10)
              .map(({ _id, productId, date, quantity, price }) => (
                <div key={_id} className='grid grid-cols-6 gap-5'>
                  <img
                    className='h-12 w-full rounded border object-cover'
                    src={productId.image}
                    alt={productId.name}
                  />
                  <div className='col-span-3 truncate whitespace-nowrap'>
                    <h1 className='font-semibold'>{productId.name}</h1>
                    <p className='text-sm text-muted-foreground'>
                      {dateFormatter(date)}
                    </p>
                  </div>
                  <div className='col-span-2 text-right '>
                    <h3 className='font-semibold sm:text-lg'>
                      +{currencyFormate(price)} ৳
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                      Quantity : {quantity}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className='font-semibold'>No Orders Found</div>
        )}
      </CardContent>
    </Card>
  );
}
