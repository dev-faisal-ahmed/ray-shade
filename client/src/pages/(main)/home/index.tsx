import { RecentOrders } from './recent-orders/recent-orders';
import { RecentProducts } from './recent-products/recent-products';
import { Summary } from './summary/summary';

export default function HomePage() {
  return (
    <>
      <Summary />
      <section className='my-5 flex flex-col gap-5 xl:flex-row'>
        <RecentProducts />
        <RecentOrders />
      </section>
    </>
  );
}
