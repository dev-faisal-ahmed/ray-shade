import { ReactNode, Suspense } from 'react';

type SuspenseWrapperProps = {
  page: ReactNode;
  loader: ReactNode;
};

export function SuspenseWrapper({ page, loader }: SuspenseWrapperProps) {
  return <Suspense fallback={loader}>{page}</Suspense>;
}
