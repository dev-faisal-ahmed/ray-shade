import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader } from '@/components/shared/loader';
import { currencyFormate } from '@/lib/helper/utility-helper';
import { cn } from '@/lib/utils';
import { useGetAllProductQuery } from '@/redux/api/product-api';

export function RecentProducts() {
  const { data: productData, isLoading } = useGetAllProductQuery(null);
  const tdClass = 'p-2 whitespace-nowrap';

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
        <CardTitle>Recently Added Products</CardTitle>
        <CardDescription>Here's Recently Added Products</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='customized_scrollbar overflow-y-auto'>
          {productData?.data && productData.data.length > 0 ? (
            <table className='w-full'>
              <tbody>
                {productData.data
                  .slice(0, 10)
                  .map(
                    ({
                      _id,
                      image,
                      name,
                      price,
                      brand,
                      lensSize,
                      gender,
                      quantity,
                      shape,
                      material,
                    }) => (
                      <tr key={_id}>
                        <td className={tdClass}>
                          <div className='h-12 w-12'>
                            <img
                              className='h-12 w-12 rounded object-cover shadow'
                              src={image}
                              alt={name}
                            />
                          </div>
                        </td>
                        <td className={cn(tdClass, '')}>
                          <h1 className='font-semibold'>{name}</h1>
                          <p className='text-sm text-muted-foreground'>
                            {brand}
                          </p>
                        </td>
                        <td className={cn(tdClass, 'capitalize')}>
                          <p className='font-semibold'>Gender : {gender}</p>
                          <p className='text-muted-foreground'>{lensSize}</p>
                        </td>

                        <td className={tdClass}>
                          <p className='font-semibold'>Shape : {shape}</p>
                          <p className='text-muted-foreground'>{material}</p>
                        </td>
                        <td className={cn(tdClass, 'text-right ')}>
                          <div>
                            <h1 className='font-semibold sm:text-lg'>
                              +{currencyFormate(price)} ৳
                            </h1>
                            <p className='text-sm text-muted-foreground'>
                              Quantity : {quantity}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ),
                  )}
              </tbody>
            </table>
          ) : (
            <div>No Products Found</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
