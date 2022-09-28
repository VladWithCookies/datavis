import { map } from 'ramda';

import styles from './XAxis.module.css';

export default function  XAxis({ xScale, innerHeight, formatTick }) {
  return map((tick) => (
    <g
      key={tick}
      transform={`translate(${xScale(tick)}, 0)`}
    >
      <line
        y2={innerHeight}
        className={styles.line}
      />
      <text
        y={innerHeight + 3}
        dy="0.71em"
        className={styles.text}
      >
        {formatTick(tick)}
      </text>
    </g>
  ), xScale.ticks());
};
