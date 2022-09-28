import { map } from 'ramda';

import styles from './YAxis.module.css';

export default function  YAxis({ yScale }) {
  return map((tick) => (
    <text
      key={tick}
      x={-3}
      y={yScale(tick) + yScale.bandwidth() / 2}
      dy="0.32em"
      className={styles.text}
    >
      {tick}
    </text>
  ), yScale.domain());
};
