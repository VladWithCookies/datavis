import { prop } from 'ramda';
import { pie, arc } from 'd3';

export default function PieChart() {
  const height = 450;
  const width = 450;

  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - margin.top - margin.right;

  const rawData = [
    {
      value: 75,
      label: 'Sky',
      color: 'blue',
    },
    {
      value: 15,
      label: 'Sunny Side of Pyramid',
      color: 'yellow'
    },
    {
      value: 10,
      label: 'Shady Side of Pyramid',
      color: 'brown',
    },
  ];

  const createPie = pie()
    .value(prop('value'));

  const createArc = arc()
    .innerRadius(0)
    .outerRadius(radius);

  const data = createPie(rawData);

  return (
    <svg
      height={height}
      width={width}
    >
      <g transform={`translate(${centerX}, ${centerY}) rotate(-135)`}>
        {data.map((item, index) => (
          <path
            key={item.data.label}
            d={createArc(item)}
            fill={item.data.color}
          />
        ))}
      </g>
    </svg>
  );
};
