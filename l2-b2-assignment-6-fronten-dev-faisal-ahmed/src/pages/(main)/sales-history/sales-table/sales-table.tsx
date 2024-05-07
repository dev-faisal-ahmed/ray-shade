/* eslint-disable react-hooks/exhaustive-deps */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useGetAllOrdersQuery,
  useGetDailyOrdersQuery,
  useGetMonthlyOrdersQuery,
  useGetWeeklyOrdersQuery,
  useGetYearlyOrdersQuery,
} from '@/redux/api/order-api';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { SalesHeader } from './sales-header';
import { SalesRow } from './sales-row';
import { useEffect, useState } from 'react';
import { updateOrders } from '@/redux/slices/order-slice';
import { Loader } from '@/components/shared/loader';

type OrdersHistoryCategoryType =
  | 'all'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly';

export function SalesTable() {
  const { orders } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const { data: allOrders, isLoading: allOrdersLoading } =
    useGetAllOrdersQuery(null);
  const { data: dailyOrders, isLoading: dailyOrdersLoading } =
    useGetDailyOrdersQuery(null);
  const { data: weeklyOrders, isLoading: weeklyOrdersLoading } =
    useGetWeeklyOrdersQuery(null);
  const { data: monthlyOrders, isLoading: monthlyOrdersLoading } =
    useGetMonthlyOrdersQuery(null);
  const { data: yearlyOrders, isLoading: yearlyOrdersLoading } =
    useGetYearlyOrdersQuery(null);

  const [selectedCategory, setSelectedCategory] =
    useState<OrdersHistoryCategoryType>('all');

  const handleCategoryChange = () => {
    if (selectedCategory === 'all')
      dispatch(updateOrders(allOrders?.data || []));
    else if (selectedCategory === 'daily')
      dispatch(updateOrders(dailyOrders?.data || []));
    else if (selectedCategory === 'weekly')
      dispatch(updateOrders(weeklyOrders?.data || []));
    else if (selectedCategory === 'monthly')
      dispatch(updateOrders(monthlyOrders?.data || []));
    else if (selectedCategory === 'yearly')
      dispatch(updateOrders(yearlyOrders?.data || []));
  };

  useEffect(() => {
    handleCategoryChange();
  }, [allOrders?.data, dailyOrders?.data]);

  useEffect(() => {
    handleCategoryChange();
  }, [selectedCategory]);

  const onSelectedCategoryChange = (value: OrdersHistoryCategoryType) =>
    setSelectedCategory(value);

  if (
    allOrdersLoading ||
    dailyOrdersLoading ||
    weeklyOrdersLoading ||
    monthlyOrdersLoading ||
    yearlyOrdersLoading
  ) {
    return (
      <div className='mx-auto mt-5 w-fit'>
        <Loader />
      </div>
    );
  }
  return (
    <div className='w-full rounded-md px-5 pt-5'>
      <div className='mb-5 flex items-center gap-5'>
        <h1 className='text-xl font-semibold'>Orders</h1>
        <div className='ml-auto w-full max-w-40'>
          <Select
            value={selectedCategory}
            onValueChange={onSelectedCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Any' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='daily'>Daily</SelectItem>
                <SelectItem value='weekly'>Weekly</SelectItem>
                <SelectItem value='monthly'>Monthly</SelectItem>
                <SelectItem value='yearly'>Yearly</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='customized_scrollbar overflow-x-auto'>
        {orders && orders.length > 0 ? (
          <table className='mb-5 w-full'>
            <SalesHeader />
            <tbody>
              {orders.map((order, index) => (
                <SalesRow key={index} {...order} />
              ))}
            </tbody>
          </table>
        ) : (
          <div className='mb-5 text-center font-semibold'>
            No Order Found Please Add Some
          </div>
        )}
      </div>
    </div>
  );
}
