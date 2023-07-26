import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { ChartProps } from '../../types';

const Chart = ({ candledData, selectedStocks }: ChartProps) => {
  const [c1, c2, c3] = selectedStocks;
  return (
    <AreaChart
      width={900}
      height={450}
      data={candledData}
      style={{ margin: '30px auto 0 auto' }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
      <Area
        type="monotone"
        dataKey={c1}
        stackId="1"
        stroke="#000000"
        fill="#000000"
      />
      {c2 && (
        <Area
          type="monotone"
          dataKey={c2}
          stackId="1"
          stroke="#ffa351"
          fill="#ffa351"
        />
      )}
      {c3 && (
        <Area
          type="monotone"
          dataKey={c3}
          stackId="1"
          stroke="#cc313d"
          fill="#cc313d"
        />
      )}
    </AreaChart>
  );
};

export default React.memo(Chart);
