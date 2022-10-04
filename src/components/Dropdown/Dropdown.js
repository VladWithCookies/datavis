import { map } from 'ramda';

import styles from './Dropdown.module.css';

export default function Dropdown({ id, label, value, onChange, options }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <>
      <label
        htmlFor={id}
        className={styles.label}
      >
        {label}
      </label>
      <select
        id={id}
        onChange={handleChange}
        className={styles.select}
      >
        {map((option) => (
          <option
            key={option.value}
            value={option.value}
            className={styles.option}
          >
            {option.label}
          </option>
        ), options)}
      </select>
    </>
  );
};
