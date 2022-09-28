import styles from './AxisLabel.module.css';

export default function AxisLabel({ children, innerWidth, innerHeight }) {
  return (
    <text
      x={innerWidth / 2}
      y={innerHeight + 50}
      className={styles.text}
    >
      {children}
    </text>
  );
}
