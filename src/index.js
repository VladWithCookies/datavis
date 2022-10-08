import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import BarChart from './pages/BarChart';
import ScatterPlot from './pages/ScatterPlot';
import LineChart from './pages/LineChart';
import WorldMap from './pages/WorldMap';
import Histogram from './pages/Histogram';
import ChoroplethMap from 'pages/ChoroplethMap';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bar-chart" element={<BarChart />} />
        <Route path="/scatter-plot" element={<ScatterPlot />} />
        <Route path="/line-chart" element={<LineChart />} />
        <Route path="/world-map" element={<WorldMap />} />
        <Route path="/histogram" element={<Histogram />} />
        <Route path="/choropleth-map" element={<ChoroplethMap />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
