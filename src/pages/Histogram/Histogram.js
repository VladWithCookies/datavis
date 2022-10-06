import { prop, map } from 'ramda';
import { bin, scaleLinear, scaleTime, extent, timeFormat, timeMonths, sum, max } from 'd3';

import { MISSING_MIGRANTS_DATA_URL } from 'constants/data';
import useCSVData from 'hooks/useCSVData';
import styles from './Histogram.module.css';

export default function Histogram() {
  const selector = (item) => ({
    total: parseFloat(item['Total Dead and Missing']),
    date: new Date(item['Reported Date']),
  });

  const data = useCSVData(MISSING_MIGRANTS_DATA_URL, { selector });

  const height = 730;
  const width = 1164;

  const margin = {
    top: 20,
    right: 200,
    bottom: 80,
    left: 100,
  };

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  const xValue = prop('date');
  const yValue = prop('total');

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(...xScale.domain()))(data)
    .map((array) => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1,
    }));

  const yScale = scaleLinear()
    .domain([0, max(binnedData, prop('y'))])
    .range([innerHeight, 0])
    .nice();

  const formatTick = timeFormat('%Y');

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
          Total Dead and Missing
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
        {map((item) => (
          <rect
            x={xScale(item.x0)}
            y={yScale(item.y)}
            width={xScale(item.x1) - xScale(item.x0)}
            height={innerHeight - yScale(item.y)}
            className={styles.bar}
          >
            <title>{formatTick(item.y)}</title>
          </rect>
        ), binnedData)}
      </g>
    </svg>
  );
}
