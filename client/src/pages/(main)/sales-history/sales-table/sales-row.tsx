import { dateFormatter } from '@/lib/helper/utility-helper';
import { OrderType } from '@/lib/types/data-types';
import { cn } from '@/lib/utils';

export function SalesRow({
  name,
  date,
  productId,
  quantity,
  price,
}: OrderType) {
  const tdClass = `py-2 px-2 border-b border-primary-200 text-sm whitespace-nowrap`;
  return (
    <tr>
      <td className={cn(tdClass)}>
        <img
          className='h-10 w-10 rounded-md shadow'
          src={productId.image}
          alt={name}
        />
      </td>
      <td className={cn(tdClass, 'font-semibold')}>{productId.name}</td>
      <td className={cn(tdClass)}>{name}</td>
      <td className={cn(tdClass)}>{quantity}</td>
      <td className={cn(tdClass)}>{price}</td>
      <td className={cn(tdClass)}>{dateFormatter(date)}</td>
    </tr>
  );
}
