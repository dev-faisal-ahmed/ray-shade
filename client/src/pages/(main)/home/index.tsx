import { Chart } from './charts/chart';
import { RecentOrders } from './recent-orders/recent-orders';
import { RecentProducts } from './recent-products/recent-products';
import { Summary } from './summary/summary';

const dataForProductsSold = [
  { month: 'Sep:2023', value: 7890 },
  { month: 'Oct:2023', value: 5670 },
  { month: 'Nov:2023', value: 1350 },
  { month: 'Dec:2023', value: 11290 },
  { month: 'Jan:2024', value: 8634 },
  { month: 'Feb:2024', value: 11230 },
  { month: 'Mar:2024', value: 5240 },
  { month: 'Apr:2024', value: 7150 },
  { month: 'May:2024', value: 1500 },
  { month: 'Jun:2024', value: 12893 },
  { month: 'Jul:2023', value: 4590 },
  { month: 'Aug:2023', value: 10250 },
];

const dataForNewUser = [
  { month: 'Sep:2023', value: 15 },
  { month: 'Oct:2023', value: 34 },
  { month: 'Nov:2023', value: 17 },
  { month: 'Dec:2023', value: 28 },
  { month: 'Jan:2024', value: 35 },
  { month: 'Feb:2024', value: 15 },
  { month: 'Mar:2024', value: 11 },
  { month: 'Apr:2024', value: 9 },
  { month: 'May:2024', value: 27 },
  { month: 'Jun:2024', value: 23 },
  { month: 'Jul:2023', value: 16 },
  { month: 'Aug:2023', value: 19 },
];

export default function HomePage() {
  return (
    <>
      <Summary />
      <section className='mt-5 grid gap-5 md:grid-cols-2'>
        <Chart
          title='Products Sold'
          description='All the sells since last 12 months'
          chartConfig={{
            value: {
              label: 'Sell',
              color: '#098637',
            },
          }}
          chartData={dataForProductsSold}
          fillColor='#0f3f39'
        />

        <Chart
          title='New Customers'
          description='All the new customer since last 12 months'
          chartConfig={{
            value: {
              label: 'Sell',
              color: '#098637',
            },
          }}
          chartData={dataForNewUser}
          fillColor='#397E76'
        />
      </section>
      <section className='my-5 flex flex-col gap-5 xl:flex-row'>
        <RecentProducts />
        <RecentOrders />
      </section>
    </>
  );
}
