import { cn } from '@/lib/utils';

export function SalesHeader() {
  const thClassName = `pb-3 px-2 text-sm text-primary-400 text-left`;
  return (
    <thead className='border-b border-primary-300'>
      <tr>
        <th className={cn(thClassName)}>Image</th>
        <th className={cn(thClassName)}>Product Name</th>
        <th className={cn(thClassName)}>Buyer Name</th>
        <th className={cn(thClassName)}>Quantity</th>
        <th className={cn(thClassName)}>Total Price</th>
        <th className={cn(thClassName)}>Date</th>
      </tr>
    </thead>
  );
}
