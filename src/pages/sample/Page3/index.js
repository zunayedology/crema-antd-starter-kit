import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
} from 'recharts';

const SimpleLineChart = () => {
  const data1 = [
    {name: 'A', pv: getRandomValue(), uv: getRandomValue()},
    {name: 'B', pv: getRandomValue(), uv: getRandomValue()},
    {name: 'C', pv: getRandomValue(), uv: getRandomValue()},
    {name: 'D', pv: getRandomValue(), uv: getRandomValue()},
    {name: 'E', pv: getRandomValue(), uv: getRandomValue()},
  ];
  const data2 = [
    {name: 'F', pv: getRandomValue(), uv: getRandomValue()},
    {name: 'G', pv: getRandomValue(), uv: getRandomValue()},
    {name: 'H', pv: getRandomValue(), uv: getRandomValue()},
    {name: 'I', pv: getRandomValue(), uv: getRandomValue()},
    {name: 'J', pv: getRandomValue(), uv: getRandomValue()},
  ];
  function getRandomValue() {
    return Math.floor(Math.random() * 100);
  }

  return (
    <>
      <ResponsiveContainer width='100%' height={200}>
        <LineChart
          data={data1}
          margin={{top: 10, right: 0, left: -25, bottom: 0}}>
          <XAxis dataKey='name' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey='pv'
            stroke='#4299E1'
            activeDot={{r: 8}}
          />
          <Line type='monotone' dataKey='uv' stroke='#F04F47' />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width='100%' height={200}>
        <AreaChart
          data={data2}
          margin={{top: 10, right: 0, left: -25, bottom: 0}}>
          <XAxis dataKey='name' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Legend />
          <Area type='monotone' dataKey='pv' fill='#4299E1' stroke='#4299E1' />
          <Area type='monotone' dataKey='uv' fill='#F04F47' stroke='#F04F47' />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default SimpleLineChart;
