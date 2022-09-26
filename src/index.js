import React from 'react';
import ReactDOM from 'react-dom/client';

import BarChart from './components/BarChart';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BarChart />
  </React.StrictMode>
);
