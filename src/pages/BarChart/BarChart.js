import { scaleBand, scaleLinear, max, format } from 'd3';
import { map, prop } from 'ramda';

import useData from 'hooks/useData';
import XAxis from 'components/XAxis';
import YAxis from 'components/YAxis';
import Bars from 'components/Bars';
import AxisLabel from 'components/AxisLabel';

export default function BarChart() {
  const data = useData();

  const height = 600;
  const width = 800;

  const margin = {
    top: 20,
    right: 60,
    bottom: 80,
    left: 200,
  };

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  const xValue = prop('Population');
  const yValue = prop('Country');

  const formatTick = format('.2s');

  const yScale = scaleBand()
    .domain(map(yValue, data))
    .range([0, innerHeight])
    .paddingInner(0.1);

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <XAxis
          xScale={xScale}
          innerHeight={innerHeight}
          formatTick={formatTick}
        />
        <YAxis yScale={yScale} />
        <AxisLabel
          innerHeight={innerHeight}
          innerWidth={innerWidth}
        >
          Population
        </AxisLabel>
        <Bars
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          formatTick={formatTick}
        />
      </g>
    </svg>
  );
};
