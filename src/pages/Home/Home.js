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
    </ul>
  );
}
