import { useState } from 'react';
import { prop, map, find, propEq } from 'ramda';
import { scaleLinear, extent } from 'd3';

import { IRIS_DATA_URL } from 'constants/data';
import useCSVData from 'hooks/useCSVData';
import Dropdown from 'components/Dropdown';
import styles from './ScatterChart.module.css';

export default function ScatterChart() {
  const selector = (item) => ({
    sepalLength: parseFloat(item.sepal_length),
    petalLength: parseFloat(item.petal_length),
    sepalWidth: parseFloat(item.sepal_width),
    petalWidth: parseFloat(item.petal_width),
  });

  const data = useCSVData(IRIS_DATA_URL, { selector });
  const initialXAttribute = 'sepalLength';
  const initialYAttribute = 'petalLength';

  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const [yAttribute, setYAttribute] = useState(initialYAttribute);

  const options = [
    { value: 'sepalLength', label: 'Sepal Length' },
    { value: 'petalLength', label: 'Petal Length' },
    { value: 'sepalWidth', label: 'Sepal Width' },
    { value: 'petalWidth', label: 'Petal Width' },
  ];

  const getLabel = (attribute) => prop('label', find(propEq('value', attribute), options));

  const xValue = prop(xAttribute);
  const yValue = prop(yAttribute);
  const xLabel = getLabel(xAttribute);
  const yLabel = getLabel(yAttribute);

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

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])
    .nice();

  return (
    <>
      <Dropdown
        id="x"
        label="X:"
        value={xAttribute}
        onChange={setXAttribute}
        options={options}
      />
      <Dropdown
        id="y"
        label="Y:"
        value={yAttribute}
        onChange={setYAttribute}
        options={options}
      />
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
                {tick}
              </text>
            </g>
          ), xScale.ticks())}
          <text
            className={styles.label}
            transform={`translate(-50, ${innerHeight / 2}) rotate(-90)`}
          >
            {xLabel}
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
            {yLabel}
          </text>
          {map((item) => (
            <circle
              cx={xScale(xValue(item))}
              cy={yScale(yValue(item))}
              r={5}
              className={styles.point}
            >
              <title>{xValue(item)}</title>
            </circle>
          ), data)}
        </g>
      </svg>
    </>
  );
}
