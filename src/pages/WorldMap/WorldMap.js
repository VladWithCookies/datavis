import { map } from 'ramda';
import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';

import { GEO_DATA_URL } from 'constants/data';
import useGeoData from 'hooks/useGeoData';
import styles from './WorldMap.module.css';

export default function WorldMap() {
  const data = useGeoData(GEO_DATA_URL);

  const height = 768;
  const width = 1024;

  const projection = geoNaturalEarth1();
  const path = geoPath(projection);
  const graticule = geoGraticule();

  if (!data) return null;

  const { land, interiors } = data;

  return (
    <svg width={width} height={height}>
      <path
        d={path({ type: 'Sphere' })}
        className={styles.sphere}
      />
      <path
        d={path(graticule())}
        className={styles.graticule}
      />
      {map((item) => (
        <path
          d={path(item)}
          className={styles.land}
        />
      ), land.features)}
      <path
        d={path(interiors)}
        className={styles.interiors}
      />
    </svg>
  );
};
