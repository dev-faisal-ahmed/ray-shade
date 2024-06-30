import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Loader } from '@/components/shared/loader';
import { MainLayout } from '@/components/layout/main-layout';

const HomePage = lazy(() => import('@/pages/(main)/home'));
const RegisterPage = lazy(() => import('@/pages/(auth)/register'));
const ProductsPage = lazy(() => import('@/pages/(main)/products'));
const LoginPage = lazy(() => import('@/pages/(auth)/login'));
const AddProductPage = lazy(() => import('@/pages/(main)/add-product'));
const SalesHistoryPage = lazy(() => import('@/pages/(main)/sales-history'));
const ProductDuplicateEditPage = lazy(
  () => import('@/pages/(main)/product-duplicate-edit'),
);
const PaymentSlipPage = lazy(() => import('@/pages/(main)/payment-slip'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/products/add',
        element: <AddProductPage />,
      },
      {
        path: '/products/duplicate/:productId',
        element: <ProductDuplicateEditPage />,
      },
      {
        path: '/sales',
        element: <SalesHistoryPage />,
      },
      {
        path: '/payment-slip/:orderId',
        element: <PaymentSlipPage />,
      },
    ],
  },

  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

export function Router() {
  return (
    <Suspense
      fallback={
        <div className='flex h-screen w-full items-center justify-center bg-primary-50'>
          <Loader />
        </div>
      }
    >
      <RouterProvider router={routes} />
    </Suspense>
  );
}
