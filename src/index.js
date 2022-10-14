import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from 'pages/Home';
import BarChart from 'pages/BarChart';
import ScatterPlot from 'pages/ScatterPlot';
import LineChart from 'pages/LineChart';
import BubbleMap from 'pages/BubbleMap';
import Histogram from 'pages/Histogram';
import ChoroplethMap from 'pages/ChoroplethMap';
import GraphDiagram from 'pages/GraphDiagram';
import PieChart from 'pages/PieChart';
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
        <Route path="/bubble-map" element={<BubbleMap />} />
        <Route path="/histogram" element={<Histogram />} />
        <Route path="/choropleth-map" element={<ChoroplethMap />} />
        <Route path="/graph-diagram" element={<GraphDiagram />} />
        <Route path="/pie-chart" element={<PieChart />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
