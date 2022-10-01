import { scaleBand, scaleLinear, max, format } from 'd3';
import { map, prop } from 'ramda';

import { POPULATION_DATA_URL } from 'constants/data';
import useData from 'hooks/useData';
import styles from './BarChart.module.css';

export default function BarChart() {
  const selector = (item) => ({
    country: item['Country'],
    population: parseFloat(item['2020']) * 1000
  });

  const data = useData(POPULATION_DATA_URL, { selector, limit: 10 });

  const height = 768;
  const width = 1024;

  const margin = {
    top: 20,
    right: 60,
    bottom: 80,
    left: 200,
  };

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  const xValue = prop('population');
  const yValue = prop('country');

  const formatTick = format('.2s');

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  const yScale = scaleBand()
    .domain(map(yValue, data))
    .range([0, innerHeight])
    .paddingInner(0.1);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {map((tick) => (
          <g
            key={tick}
            transform={`translate(${xScale(tick)}, 0)`}
          >
            <line
              y2={innerHeight}
              className={styles.scale}
            />
            <text
              y={innerHeight + 10}
              dy="0.71em"
              className={styles.tick}
            >
              {formatTick(tick)}
            </text>
          </g>
        ), xScale.ticks())}
        {map((tick) => (
          <text
            key={tick}
            x={-3}
            y={yScale(tick) + yScale.bandwidth() / 2}
            dy="0.32em"
            className={styles.tick}
          >
            {tick}
          </text>
        ), yScale.domain())}
        <text
          x={innerWidth / 2}
          y={innerHeight + 50}
          className={styles.label}
        >
          Population
        </text>
        {map((item) => (
          <rect
            key={xValue(item)}
            x={0}
            y={yScale(yValue(item))}
            width={xScale(xValue(item))}
            height={yScale.bandwidth()}
            className={styles.bar}
          >
            <title>{formatTick(xValue(item))}</title>
          </rect>
        ), data)}
      </g>
    </svg>
  );
};
