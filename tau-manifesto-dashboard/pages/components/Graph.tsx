"use client"
// components/Graph.js
import React, { useEffect, useRef, useState } from 'react';
import { NumberValue, scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { ActionPoint } from './types';
import { Zoom } from 'react-d3-library';

interface GraphProps {
  onAddActionPoint: (coordinate: ActionPoint) => void;
}

const Graph: React.FC<GraphProps> = ({ onAddActionPoint }) => {
  const svgRef = useRef(null);
  const [coordinates, setCoordinates] = useState<ActionPoint[]>([]);

  // Add a click event handler to the svg.
  const handleClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    const coordinatesArray = [...coordinates];
    coordinatesArray.push({
      x: event.clientX,
      y: event.clientY,
    });
    setCoordinates(coordinatesArray);

    // Call the onAddActionPoint callback when adding a new point.
    onAddActionPoint({
      x: event.clientX,
      y: event.clientY,
    });
  };

  // Create the grid and draw the graph.
  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleLinear().domain([0, 140]).range([0, 140]);
    const yScale = scaleLinear().domain([0, 140]).range([140, 0]);
  
    svg
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 140)
      .attr('height', 140)
      .attr('fill', 'none')
      .attr('stroke', 'black');
  
    svg
      .append('g')
      .attr('id', 'grid')
      .selectAll('line')
      .data(xScale.ticks(10).concat(yScale.ticks(10)))
      .enter()
      .append('line')
      .attr('x1', (d) => xScale(d))
      .attr('y1', (d) => yScale(d))
      .attr('x2', (d) => xScale(d))
      .attr('y2', 0)
      .attr('stroke', 'gray')
      .attr('stroke-width', 0.5);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        onClick={handleClick}
      >
        {/* SVG elements for drawing lines, splines, and action points can be added here. */}
      </svg>
      <Zoom />
    </div>
  );
};

export default Graph;