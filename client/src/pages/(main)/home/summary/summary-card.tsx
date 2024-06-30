import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { currencyFormate } from '@/lib/helper/utility-helper';
import { DollarSign } from 'lucide-react';

type SummaryCardProps = {
  title: string;
  amount: number;
  description: string;
};

export function SummaryCard({ title, amount, description }: SummaryCardProps) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='text-primary-700'>{title}</CardTitle>
        <DollarSign className='text-primary-700' />
      </CardHeader>
      <CardContent>
        <div className='mb-1 text-2xl font-bold text-primary-700'>
          {currencyFormate(amount)}৳
        </div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
