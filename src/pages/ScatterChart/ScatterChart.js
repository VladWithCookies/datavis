import { useState } from 'react';
import { prop, map, find, propEq, filter } from 'ramda';
import { scaleLinear, scaleOrdinal, extent } from 'd3';

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
    species: item.species,
  });

  const data = useCSVData(IRIS_DATA_URL, { selector });
  const initialXAttribute = 'sepalLength';
  const initialYAttribute = 'petalLength';

  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const [hoveredSpecies, setHoveredSpecies] = useState();

  const options = [
    { value: 'sepalLength', label: 'Sepal Length' },
    { value: 'petalLength', label: 'Petal Length' },
    { value: 'sepalWidth', label: 'Sepal Width' },
    { value: 'petalWidth', label: 'Petal Width' },
  ];

  const getLabel = (attribute) => prop('label', find(propEq('value', attribute), options));

  const xValue = prop(xAttribute);
  const yValue = prop(yAttribute);
  const colorValue = prop('species');

  const xLabel = getLabel(xAttribute);
  const yLabel = getLabel(yAttribute);

  const filteredData = filter((item) => hoveredSpecies === colorValue(item), data);

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

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])
    .nice();

  const colorScale = scaleOrdinal()
    .domain(map(colorValue, data))
    .range(['#e6842a', '#137b80', '#8e6c8a']);

  return (
    <>
      <div className={styles.menus}>
        <Dropdown
          id="x"
          label="X"
          value={xAttribute}
          onChange={setXAttribute}
          options={options}
        />
        <Dropdown
          id="y"
          label="Y"
          value={yAttribute}
          onChange={setYAttribute}
          options={options}
        />
      </div>
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
          <g opacity={hoveredSpecies ? 0.5 : 1}>
            {map((item) => (
              <circle
                cx={xScale(xValue(item))}
                cy={yScale(yValue(item))}
                r={7}
                fill={colorScale(colorValue(item))}
              >
                <title>{xValue(item)}</title>
              </circle>
            ), data)}
          </g>
          {map((item) => (
            <circle
              cx={xScale(xValue(item))}
              cy={yScale(yValue(item))}
              r={7}
              fill={colorScale(colorValue(item))}
            >
              <title>{xValue(item)}</title>
            </circle>
          ), filteredData)}
          <g transform={`translate(${innerWidth + 50}, 40)`}>
            <text
              x={35}
              y={-25}
              className={styles.label}
            >
              Species
            </text>
            {colorScale.domain().map((item, index) => (
              <g
                key={item}
                onMouseEnter={() => setHoveredSpecies(item)}
                onMouseOut={() => setHoveredSpecies(null)}
                transform={`translate(0, ${index * 20})`}
                opacity={hoveredSpecies === item ? 0.5 : 1}
              >
                <circle
                  r={7}
                  fill={colorScale(item)}
                />
                <text
                  x={10}
                  dy="0.32em"
                  className={styles.legendText}
                >
                  {item}
                </text>
              </g>
            ))}
          </g>
        </g>
      </svg>
    </>
  );
}
