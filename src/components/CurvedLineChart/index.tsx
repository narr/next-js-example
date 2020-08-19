import React, { useState, useRef, useEffect } from 'react';
import {
  select,
  line,
  curveCardinal,
  scaleLinear,
  axisBottom,
  axisRight,
} from 'd3';

export interface CurvedLineChartProps {
  /**
   * A dummy prop to show in Docs in Storybook
   */
  dummyProp?: boolean;
}

export const CurvedLineChart: React.FC<CurvedLineChartProps> = () => {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = select(svgRef.current);
    const svgWidth = svgRef.current?.scrollWidth ?? 300;
    const svgHeight = svgRef.current?.scrollHeight ?? 150;

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, svgWidth]);
    const yScale = scaleLinear().domain([0, svgHeight]).range([svgHeight, 0]);

    const xAxis = axisBottom<number>(xScale)
      .ticks(data.length)
      .tickFormat(data => String(data + 1));
    svg
      .selectAll('.x-axis')
      .data([0])
      .join(enter => {
        return enter.append('g').call(xAxis);
      })
      .attr('class', 'x-axis')
      .style('transform', `translateY(${svgHeight}px)`);

    const yAxis = axisRight(yScale).tickSizeOuter(0);
    svg
      .selectAll('.y-axis')
      .data([0])
      .join(enter => {
        return enter.append('g').call(yAxis);
      })
      .attr('class', 'y-axis')
      .style('transform', `translateX(${svgWidth}px)`);

    const myLine = line<number>()
      .x((_value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);
    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('class', 'line')
      .attr('d', myLine)
      .attr('fill', 'none')
      .attr('stroke', 'blue');
  }, [data]);

  return (
    <>
      <div className="view">
        <svg ref={svgRef} style={{ overflow: 'visible' }} />
      </div>
      <br />
      <br />
      <button onClick={() => setData(data.map(v => v + 5))}>Update Data</button>
      &nbsp;&nbsp;
      <button onClick={() => setData(data.filter(v => v < 35))}>
        Filter Data
      </button>
      <style jsx>{`
        .view {
          display: inline-flex;
          border: 1px solid rgb(0, 183, 255);
        }
      `}</style>
    </>
  );
};
