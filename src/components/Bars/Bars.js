import { map } from 'ramda';

import styles from './Bars.module.css';

export default function Marks({ xScale, yScale, xValue, yValue, data, formatTick }) {
  return map((item) => (
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
  ), data);
};
