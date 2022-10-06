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
        <Link to="/world-map">World Map</Link>
      </li>
      <li>
        <Link to="/histogram">Histogram</Link>
      </li>
    </ul>
  );
}
