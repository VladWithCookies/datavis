import { map, prop, filter, propEq, forEach } from 'ramda';
import { geoNaturalEarth1, geoPath, geoGraticule, scaleSequential, max, interpolateYlOrRd } from 'd3';

import { HIV_DATA_URL, GEO_DATA_URL, REGIONAL_CODES_DATA_URL } from 'constants/data';
import useGeoData from 'hooks/useGeoData';
import useCSVData from 'hooks/useCSVData';
import styles from './ChoroplethMap.module.css';

export default function ChoroplethMap() {
  const geoData = useGeoData(GEO_DATA_URL);

  const data = useCSVData(HIV_DATA_URL, {
    selector: (item) => ({
      aids: item['Prevalence - HIV/AIDS - Sex: Both - Age: 15-49 years (Percent) (%)'],
      year: item['Year'],
      entity: item['Entity'],
      code: item['Code'],
    }),
  });

  const codes = useCSVData(REGIONAL_CODES_DATA_URL, {
    selector: (item) => ({
      alpha3Code: item['alpha-3'],
      numericCode: item['country-code'],
    }),
  });

  const filteredData = filter(propEq('year', '2017'), data);
  const numericCodeByAlpha3Code = new Map();
  const rowByNumericCode = new Map();

  forEach((item) => {
    numericCodeByAlpha3Code.set(item.alpha3Code, item.numericCode);
  }, codes);

  forEach((item) => {
    const numericCode = numericCodeByAlpha3Code.get(item.code);

    rowByNumericCode.set(numericCode, item);
  }, filteredData);

  const height = 500;
  const width = 1024;

  const projection = geoNaturalEarth1();
  const path = geoPath(projection);
  const graticule = geoGraticule();

  const colorValue = prop('aids');

  const colorScale = scaleSequential(interpolateYlOrRd)
    .domain([0, max(data, colorValue)])

  if (!geoData || !data || !codes) return null;

  const { countries, interiors } = geoData;

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
        {map((feature) => {
          const item = rowByNumericCode.get(feature.id);

          return (
            <path
              d={path(feature)}
              fill={item ? colorScale(colorValue(item)) : '#fafafa'}
            />
          );
        }, countries.features)}
        <path
          d={path(interiors)}
          className={styles.interiors}
        />
      </svg>
    </div>
  );
};
