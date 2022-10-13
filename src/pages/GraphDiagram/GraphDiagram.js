import { map } from 'ramda';
import { forceCenter, forceLink, forceManyBody, forceSimulation } from 'd3';
import { useState, useEffect } from 'react';

export default function GraphDiagram() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const [animatedNodes, setAnimatedNodes] = useState([]);
  const [animatedLinks, setAnimatedLinks] = useState([]);

  useEffect(() => {
    const centerX = width / 2;
    const centerY = height / 2;

    const links = [
      { source: 0,  target: 1 },
      { source: 0, target: 2 },
      { source: 1, target: 3 },
      { source: 1, target: 4 },
      { source: 1, target: 5 },
      { source: 1, target: 6 },
      { source: 1, target: 7 },
      { source: 2, target: 8 },
      { source: 2, target: 9 },
      { source: 2, target: 10 },
      { source: 2, target: 11 },
      { source: 2, target: 12 },
    ];

    const nodes = [
      { id: 'Arts Web', size: 50 },
      { id: 'Community Vision', size: 20 },
      { id: 'Silicon Valley Creates', size: 20 },
      { id: '', size: 10 },
      { id: '', size: 10 },
      { id: '', size: 10 },
      { id: '', size: 10 },
      { id: '', size: 10 },
      { id: '', size: 10 },
      { id: '', size: 10 },
      { id: '', size: 10 },
      { id: '', size: 10 },
      { id: '', size: 10 },
    ];

    const simulation = forceSimulation(nodes)
      .force('charge', forceManyBody().strength(-2000))
      .force('center', forceCenter(centerX, centerY))
      .force('links', forceLink(links));

    simulation.on('tick', () => {
      setAnimatedNodes([...simulation.nodes()]);
      setAnimatedLinks(links);
    });

    simulation.nodes([...nodes]);
    simulation.alpha(1)
    simulation.restart();

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <svg width={width} height={height}>
      {map((link) => (
        <line
          key={link.index}
          x1={link.source.x}
          y1={link.source.y}
          x2={link.target.x}
          y2={link.target.y}
          stroke="gray"
        />
      ), animatedLinks)}
      {map((node) => (
        <g
          key={node.id}
          transform={`translate(${node.x}, ${node.y})`}
        >
          <circle
            r={node.size}
            fill="#efefef"
          />
          <text  textAnchor="middle">
            {node.id}
          </text>
        </g>
      ), animatedNodes)}
    </svg>
  );
};
