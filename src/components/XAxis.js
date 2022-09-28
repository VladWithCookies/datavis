import { map } from 'ramda';

export default function  XAxis({ xScale, innerHeight }) {
  return map((tick) => (
    <g
      key={tick}
      transform={`translate(${xScale(tick)}, 0)`}
    >
      <line
        y2={innerHeight}
        stroke="black"
      />
      <text
        y={innerHeight + 3}
        dy="0.71em"
        style={{ textAnchor: 'middle' }}
      >
        {tick}
      </text>
    </g>
  ), xScale.ticks());
};
