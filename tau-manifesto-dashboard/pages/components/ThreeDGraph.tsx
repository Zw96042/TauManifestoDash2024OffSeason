// components/ThreeDGraph.tsx
import { useEffect, useRef } from 'react';
import * as d3Force3D from 'd3-force-3d';
import { select } from 'd3-selection';

interface ThreeDGraphProps {
  width: number;
  height: number;
  nodes: { id: string; x: number; y: number; z: number }[];
  onNodeClick?: (node: { id: string; x: number; y: number; z: number }) => void;
}

const ThreeDGraph: React.FC<ThreeDGraphProps> = ({ width, height, nodes, onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = select(svgRef.current);

    const simulation = d3Force3D.forceSimulation(nodes)
      .force('charge', d3Force3D.forceManyBody().strength(-50))
      .force('x', d3Force3D.forceX().x(width / 2))
      .force('y', d3Force3D.forceY().y(height / 2))
      .force('z', d3Force3D.forceZ().strength(0.1))
      .on('tick', () => {
        nodes.forEach((node) => {
          select(`#node-${node.id}`)
            .attr('transform', `translate(${node.x}, ${node.y}, ${node.z})`);
        });
      });

    nodes.forEach((node) => {
      svg.append('circle')
        .attr('id', `node-${node.id}`)
        .attr('r', 5)
        .style('fill', 'steelblue')
        .on('click', () => {
          if (onNodeClick) {
            onNodeClick(node);
          }
        });

      simulation.nodes().push(node);
    });

    simulation.alpha(1).restart();

    return () => {
      simulation.stop();
    };
  }, [width, height, nodes, onNodeClick]);

  return (
    <svg ref={svgRef} width={width} height={height}>
      <g transform={`translate(${width / 2}, ${height / 2})`} />
    </svg>
  );
};

export default ThreeDGraph;