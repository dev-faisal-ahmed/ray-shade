

import { Bar, BarChart, XAxis } from 'recharts';
import * as card from '@/components/ui/card';
import * as chart from '@/components/ui/chart';

type TProps = {
  title: string;
  description?: string;
  chartConfig: chart.ChartConfig;
  chartData: { month: string; value: number }[];
  fillColor?: string;
};

export function Chart({
  title,
  description,
  chartConfig,
  chartData,
  fillColor = '#1f6e65',
}: TProps) {
  return (
    <card.Card className='border-none p-6'>
      <card.CardHeader>
        <card.CardTitle>{title}</card.CardTitle>
        {description && (
          <card.CardDescription className='line-clamp-1'>
            {description}
          </card.CardDescription>
        )}
      </card.CardHeader>

      <chart.ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          {/* <CartesianGrid vertical={false} /> */}
          <XAxis
            dataKey='month'
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <chart.ChartTooltip
            cursor={false}
            content={<chart.ChartTooltipContent indicator='dashed' />}
          />
          <Bar dataKey='value' fill={fillColor} radius={4} />
        </BarChart>
      </chart.ChartContainer>
    </card.Card>
  );
}