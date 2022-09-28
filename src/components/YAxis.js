import { map } from 'ramda';

export default function  YAxis({ yScale }) {
  return map((tick) => (
    <text
      key={tick}
      x={-3}
      y={yScale(tick) + yScale.bandwidth() / 2}
      dy="0.32em"
      style={{ textAnchor: 'end' }}
    >
      {tick}
    </text>
  ), yScale.domain());
};
