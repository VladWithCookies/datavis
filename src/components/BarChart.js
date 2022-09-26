import { useState, useEffect } from 'react';
import { csv, scaleBand, scaleLinear, max } from 'd3';
import { map, pluck, prop, slice } from 'ramda';

import { POPULATION_DATA_URL } from 'constants/data';

export default function BarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const row = (item) => ({ ...item, Population: parseFloat(item['2020']) });

    csv(POPULATION_DATA_URL, row).then((data) => setData(slice(0, 10, data)));
  }, []);

  const height = 600;
  const width = 800;

  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  const yScale = scaleBand()
    .domain(pluck('Country', data))
    .range([0, innerHeight]);

  const xScale = scaleLinear()
    .domain([0, max(data, prop('Population'))])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {map((item) => (
          <rect
            key={item['Country']}
            x={0}
            y={yScale(item['Country'])}
            width={xScale(item['Population'])}
            height={yScale.bandwidth()}
          />
        ), data)}
      </g>
    </svg>
  );
}
