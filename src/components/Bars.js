import { map } from 'ramda';

export default function Marks({ xScale, yScale, xValue, yValue, data }) {
  return map((item) => (
    <rect
      key={xValue(item)}
      x={0}
      y={yScale(yValue(item))}
      width={xScale(xValue(item))}
      height={yScale.bandwidth()}
    />
  ), data);
};
