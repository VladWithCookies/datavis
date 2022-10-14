import { prop, map } from 'ramda';
import { scaleOrdinal, pie, arc } from 'd3';

export default function PieChart() {
  const height = 800;
  const width = 800;

  const margin = {
    top: 20,
    right: 300,
    bottom: 20,
    left: 20,
  };

  const innerHight = height - margin.top - margin.bottom;
  const innerWidth = height - margin.left - margin.right;
  const radius = Math.min(innerHight, innerWidth) / 2;

  const data = [
    { value: 75, label: 'Sky' },
    { value: 15, label: 'Sunny side of the pyramid' },
    { value: 10, label: 'Shady side of the pyramid' },
  ];

  const colorValue = prop('label');

  const colorScale = scaleOrdinal()
    .domain(map(colorValue, data))
    .range(['blue', 'yellow', 'brown']);

  const createPie = pie()
    .value(prop('value'));

  const angleOffset = - 3 * Math.PI / 4;

  const createArc = arc()
    .innerRadius(0)
    .outerRadius(radius)
    .startAngle(({ startAngle }) => startAngle + angleOffset)
    .endAngle(({ endAngle }) => endAngle + angleOffset);

  return (
    <svg
      height={height}
      width={width}
    >
      <g transform={`translate(${radius + margin.left}, ${radius + margin.top})`}>
        {createPie(data).map((item) => (
          <path
            key={item.data.label}
            d={createArc(item)}
            fill={colorScale(colorValue(item.data))}
          />
        ))}
      </g>
      <g transform={`translate(${innerWidth + 80}, ${margin.top + 40})`}>
        {colorScale.domain().map((item, index) => (
          <g
            key={item}
            transform={`translate(0, ${index * 30})`}
          >
            <circle
              r={10}
              fill={colorScale(item)}
            />
            <text
              x={20}
              dy="0.32em"
            >
              {item}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};
