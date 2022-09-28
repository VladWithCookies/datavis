import { useState, useEffect } from 'react';
import { slice } from 'ramda';
import { csv } from 'd3';

import { POPULATION_DATA_URL } from 'constants/data';

const useData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const row = (item) => ({ ...item, Population: parseFloat(item['2020']) * 1000 });

    csv(POPULATION_DATA_URL, row).then((data) => setData(slice(0, 10, data)));
  }, []);

  return data;
};

export default useData;
