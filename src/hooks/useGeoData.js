import { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson';
import { not, equals } from 'ramda';

const useGeoData = (url) => {
  const [data, setData] = useState();

  useEffect(() => {
    json(url).then((data) => setData({
      land: feature(data, data.objects.land),
      interiors: mesh(data, data.objects.countries, (a, b) => not(equals(a, b))),
    }));
  }, [url]);

  return data;
};

export default useGeoData;
