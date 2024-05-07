import {
  useGetAllOrdersQuery,
  useGetMonthlyOrdersQuery,
  useGetWeeklyOrdersQuery,
  useGetYearlyOrdersQuery,
} from '@/redux/api/order-api';
import { SummaryCard } from './summary-card';
import { useMemo } from 'react';
import { Loader } from '@/components/shared/loader';
import { totalRevenue } from '@/lib/helper/utility-helper';

export function Summary() {
  const { data: allOrders, isLoading: allOrderLoading } =
    useGetAllOrdersQuery(null);

  const { data: weeklyOrders, isLoading: weeklyOrderLoading } =
    useGetWeeklyOrdersQuery(null);

  const { data: monthlyOrders, isLoading: monthlyOrderLoading } =
    useGetMonthlyOrdersQuery(null);

  const { data: yearlyOrders, isLoading: yearlyOrderLoading } =
    useGetYearlyOrdersQuery(null);

  const allTimeRevenue = useMemo(
    () => totalRevenue(allOrders?.data || []),
    [allOrders?.data],
  );

  const weeklyRevenue = useMemo(
    () => totalRevenue(weeklyOrders?.data || []),
    [weeklyOrders?.data],
  );

  const monthlyRevenue = useMemo(
    () => totalRevenue(monthlyOrders?.data || []),
    [monthlyOrders?.data],
  );

  const yearlyRevenue = useMemo(
    () => totalRevenue(yearlyOrders?.data || []),
    [yearlyOrders?.data],
  );

  if (
    allOrderLoading ||
    weeklyOrderLoading ||
    monthlyOrderLoading ||
    yearlyOrderLoading
  ) {
    return (
      <div className='flex min-h-20 w-full items-center justify-center rounded-md border bg-white'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-4'>
      <SummaryCard
        title='Weekly Revenue'
        amount={weeklyRevenue || 0}
        description='In this week you have earned'
      />
      <SummaryCard
        title='Monthly Revenue'
        amount={monthlyRevenue || 0}
        description='In this month you have earned'
      />
      <SummaryCard
        title='Yearly Revenue'
        amount={yearlyRevenue || 0}
        description='In this year you have earned'
      />
      <SummaryCard
        title='All Time Revenue'
        amount={allTimeRevenue || 0}
        description='Total revenue you have earned'
      />
    </div>
  );
}
