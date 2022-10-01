import { prop, map, compose } from 'ramda';
import { scaleTime, scaleLinear, extent, timeFormat, line, curveNatural } from 'd3';

import { TEMPERATURE_DATA_URL } from 'constants/data';
import useData from 'hooks/useData';
import styles from './LineChart.module.css';

export default function LineChart() {
  const selector = (item) => ({
    temperature: parseFloat(item.temperature),
    timestamp: new Date(item.timestamp),
  });

  const data = useData(TEMPERATURE_DATA_URL, { selector });

  const height = 768;
  const width = 1024;

  const margin = {
    top: 20,
    right: 60,
    bottom: 80,
    left: 100,
  };

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  const xValue = prop('timestamp');
  const yValue = prop('temperature');

  const formatTick = timeFormat('%a');

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

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
        <text
          className={styles.label}
          transform={`translate(-50, ${innerHeight / 2}) rotate(-90)`}
        >
          Temperature
        </text>
        {map((tick) => (
          <g
            key={tick}
            transform={`translate(0, ${yScale(tick)})`}
          >
            <line
              x2={innerWidth}
              className={styles.scale}
            />
            <text
              key={tick}
              x={-3}
              y={yScale(tick)}
              dy="0.32em"
              className={styles.tick}
            >
              {tick}
            </text>
          </g>
        ), yScale.ticks())}
        <text
          x={innerWidth / 2}
          y={innerHeight + 50}
          className={styles.label}
        >
          Time
        </text>
        <path
          className={styles.line}
          d={line()
            .x(compose(xScale, xValue))
            .y(compose(yScale, yValue))
            .curve(curveNatural)(data)
          }
        />
      </g>
    </svg>
  );
};
