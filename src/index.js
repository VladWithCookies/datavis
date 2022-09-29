import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import BarChart from './pages/BarChart';
import ScatterChart from './pages/ScatterChart';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bar-chart" element={<BarChart />} />
        <Route path="/scatter-plot" element={<ScatterChart />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
