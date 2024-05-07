import { cn } from '@/lib/utils';
import { ProductType } from '@/lib/types/data-types';
import { UpdateProduct } from './update-product';
import { ProductSell } from './product-sell';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { bulkAdd, bulkRemove } from '@/redux/slices/product-slice';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { DeleteProduct } from './delete-product';

export function ProductTableRow(product: ProductType) {
  const { _id, image, name, price, quantity, brand, colors } = product;
  const { bulkedProduct } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const tdClass = `py-2 px-2 border-b border-primary-200 text-sm whitespace-nowrap`;

  const toggleCheck = () => {
    if (bulkedProduct[_id]) {
      dispatch(bulkRemove(_id));
    } else {
      dispatch(bulkAdd(_id));
    }
  };

  return (
    <tr>
      <td className={cn(tdClass)}>
        <input
          onChange={toggleCheck}
          checked={bulkedProduct[_id] || false}
          className='cursor-pointer'
          type='checkbox'
        />
      </td>
      <td className={cn(tdClass)}>
        <img className='h-10 w-10 rounded-md shadow' src={image} alt={name} />
      </td>
      <td className={cn(tdClass, 'font-semibold')}>{name}</td>
      <td className={cn(tdClass)}>{price}</td>
      <td className={cn(tdClass)}>{quantity}</td>
      <td className={cn(tdClass)}>{brand}</td>
      <td className={cn(tdClass)}>
        <div className='flex gap-1'>
          {colors.map((color) => (
            <span
              key={color}
              className='rounded bg-primary-200 px-2 py-1 text-xs capitalize text-white'
            >
              {color}
            </span>
          ))}
        </div>
      </td>
      <td className={cn(tdClass)}>
        <ProductSell {...product} />
      </td>
      <td className={cn(tdClass)}>
        <Button
          onClick={() => navigate(`/products/duplicate/${product._id}`)}
          className='bg-blue-500'
        >
          Duplicate Edit
        </Button>
      </td>
      <td className={cn(tdClass)}>
        {/* delete product and update product */}
        <div className='mx-auto flex w-fit items-center gap-3'>
          <DeleteProduct _id={_id} />
          <UpdateProduct {...product} />
        </div>
      </td>
    </tr>
  );
}
