import { map, prop } from 'ramda';
import { geoNaturalEarth1, geoPath, geoGraticule, scaleSqrt, max } from 'd3';

import { CITIES_DATA_URL, GEO_DATA_URL } from 'constants/data';
import useGeoData from 'hooks/useGeoData';
import useCSVData from 'hooks/useCSVData';
import styles from './BubbleMap.module.css';

export default function BubbleMap() {
  const selector = (item) => ({
    lat: parseFloat(item.lat),
    lng: parseFloat(item.lng),
    population: parseFloat(item.population),
  });

  const geoData = useGeoData(GEO_DATA_URL);
  const data = useCSVData(CITIES_DATA_URL, { selector });

  const height = 500;
  const width = 1024;

  const projection = geoNaturalEarth1();
  const path = geoPath(projection);
  const graticule = geoGraticule();

  const sizeValue = prop('population');

  const sizeScale = scaleSqrt()
    .domain([0, max(data, sizeValue)])
    .range([0, 15]);

  if (!geoData || !data) return null;

  const { land, interiors } = geoData;

  return (
    <div className={styles.container}>
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
        {map((item) => {
          const [x, y] = projection([item.lng, item.lat]);

          return (
            <circle
              cx={x}
              cy={y}
              r={sizeScale(sizeValue(item))}
              className={styles.point}
            />
          );
        }, data)}
      </svg>
    </div>
  );
};
