/* eslint-disable react-hooks/exhaustive-deps */
import { ProductTableHeader } from './product-table-header';
import { Loader } from '@/components/shared/loader';
import { ProductTableRow } from './product-table-row/product-table-row';
import { RouteOff } from 'lucide-react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { updateFilter, updateProducts } from '@/redux/slices/product-slice';
import { Filter } from './filter/filter';
import { useGetAllProductQuery } from '@/redux/api/product-api';
import { BulkDelete } from './bulk-delete';

export function ProductTable() {
  const { data: productData, isLoading } = useGetAllProductQuery(null);
  const { products, bulkedProduct, isFiltered } = useAppSelector(
    (state) => state.product,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (productData?.data) dispatch(updateProducts(productData.data));
  }, [productData?.data]);

  const onFilterRemove = () => {
    dispatch(updateProducts(productData?.data || []));
    // to remove the reset filter icon
    dispatch(updateFilter(false));
  };

  if (isLoading)
    return (
      <div className='mt-8 flex justify-center'>
        <Loader />
      </div>
    );

  return (
    <div className='mb-3 w-full rounded-md px-5 pt-5'>
      <div className='mb-5 flex items-center gap-5'>
        <h1 className='text-xl font-semibold'>Products</h1>

        <div className='ml-auto flex items-center gap-5'>
          {bulkedProduct && Object.keys(bulkedProduct).length > 0 && (
            <BulkDelete />
          )}
          {isFiltered && (
            <div
              onClick={onFilterRemove}
              className='flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1'
            >
              <RouteOff size={18} />
              <p className='text-lg'>Reset</p>
            </div>
          )}
          <Filter />
        </div>
      </div>

      <div className='customized_scrollbar overflow-x-auto'>
        {products && products.length > 0 ? (
          <table className='mb-5 w-full'>
            <ProductTableHeader />
            <tbody>
              {products.map((product) => (
                <>
                  {product.quantity > 0 && (
                    <ProductTableRow key={product._id} {...product} />
                  )}
                </>
              ))}
            </tbody>
          </table>
        ) : (
          <div className='mb-5 text-center font-semibold'>
            No Product Found Please Add Some
          </div>
        )}
      </div>
    </div>
  );
}
