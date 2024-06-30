import { cn } from '@/lib/utils';
import { isAllBulked } from '@/lib/helper/utility-helper';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { bulkDeSelectAll, bulkSelectAll } from '@/redux/slices/product-slice';

export function ProductTableHeader() {
  const dispatch = useAppDispatch();
  const { products, bulkedProduct } = useAppSelector((state) => state.product);

  const toggle = () => {
    if (isAllBulked(products, bulkedProduct)) {
      dispatch(bulkDeSelectAll());
      return;
    }
    dispatch(bulkSelectAll());
  };

  const thClassName = `pb-3 px-2 text-sm text-primary-400 text-left`;
  return (
    <thead className='border-b border-primary-300'>
      <tr>
        <th className={cn(thClassName)}>
          <input
            onChange={toggle}
            className='cursor-pointer'
            type='checkbox'
            checked={isAllBulked(products, bulkedProduct)}
          />
        </th>
        <th className={cn(thClassName)}>Image</th>
        <th className={cn(thClassName)}>Name</th>
        <th className={cn(thClassName)}>Price</th>
        <th className={cn(thClassName)}>Quantity</th>
        <th className={cn(thClassName)}>Brand</th>
        <th className={cn(thClassName)}>Colors</th>
        <th className={cn(thClassName)}>Sell</th>
        <th className={cn(thClassName)}>Duplicate And Edit</th>
        <th className={cn(thClassName, 'text-center')}>Actions</th>
      </tr>
    </thead>
  );
}
