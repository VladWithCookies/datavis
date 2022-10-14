import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <ul>
      <li>
        <Link to="/bar-chart">Bar Chart</Link>
      </li>
      <li>
        <Link to="/scatter-plot">Scatter Plot</Link>
      </li>
      <li>
        <Link to="/line-chart">Line Chart</Link>
      </li>
      <li>
        <Link to="/bubble-map">Bubble Map</Link>
      </li>
      <li>
        <Link to="/histogram">Histogram</Link>
      </li>
      <li>
        <Link to="/choropleth-map">Choropleth Map</Link>
      </li>
      <li>
        <Link to="/graph-diagram">Graph Diagram</Link>
      </li>
      <li>
        <Link to="/pie-chart">Pie Chart</Link>
      </li>
    </ul>
  );
}
