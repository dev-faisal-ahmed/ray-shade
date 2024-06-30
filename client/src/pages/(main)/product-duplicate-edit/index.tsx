import { useParams } from 'react-router-dom';
import { ProductDuplicateEdit } from './product-duplicate-edit';

export default function ProductDuplicateEditPage() {
  const { productId } = useParams();

  return <ProductDuplicateEdit productId={productId as string} />;
}
