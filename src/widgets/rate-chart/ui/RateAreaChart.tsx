import {
  ResponsiveContainer,
  AreaChart,
  Area,
  YAxis,
  XAxis,
  Tooltip,
} from 'recharts';
import type { RateHistoryPoint, ChangeDirection } from '@/entities/currency';
import { formatRate } from '@/entities/currency';
import { formatDate } from '@/shared/lib/date';

const CHART_COLORS = {
  up: '#22b14c',
  down: '#ea3a3a',
  flat: '#8e93a1',
} as const;

interface RateAreaChartProps {
  data: RateHistoryPoint[];
  direction: ChangeDirection;
}

export const RateAreaChart = ({ data, direction }: RateAreaChartProps) => {
  const color = CHART_COLORS[direction];
  const gradientId = `gradient-${direction}`;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.2} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" hide />
        <YAxis hide domain={['dataMin', 'dataMax']} />
        <Tooltip
          labelFormatter={(label) => formatDate(String(label))}
          formatter={(value) => [
            typeof value === 'number' ? formatRate(value) : '—',
            'Rate',
          ]}
          contentStyle={{
            borderRadius: '8px',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            fontSize: '13px',
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fillOpacity={1}
          fill={`url(#${gradientId})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
