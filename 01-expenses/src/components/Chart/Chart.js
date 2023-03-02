import React from 'react';
import './Chart.css';

import ChartBar from './ChartBar';

const Chart = (props) => {
  const dpValues = props.dataPoints.map((x) => x.value);
  const totalMax = Math.max(...dpValues);

  return (
    <div className='chart'>
      {props.dataPoints.map((dp) => (
        <ChartBar
          key={dp.label}
          value={dp.value}
          maxValue={totalMax}
          label={dp.label}
        />
      ))}
    </div>
  );
};

export default Chart;
