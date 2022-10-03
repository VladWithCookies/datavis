import { useState, useEffect, useCallback } from 'react';
import { slice } from 'ramda';
import { csv } from 'd3';

const useCSVData = (url, { selector, limit }) => {
  const [data, setData] = useState([]);
  const row = useCallback(selector, []);

  useEffect(() => {
    csv(url, row).then((data) => setData(limit ? slice(0, limit, data) : data));
  }, [url, row, limit]);

  return data;
};

export default useCSVData;
