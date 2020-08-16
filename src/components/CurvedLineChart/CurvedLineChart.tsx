import React, { useState, useRef, useEffect } from 'react';
import { select, line, curveCardinal } from 'd3';

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
    const myLine = line<number>()
      .x((_value, index) => index * 50)
      .y((value, index) => {
        if (index > 0) {
          return 150 - value;
        }
        return svgRef.current?.scrollHeight ?? 150;
      })
      .curve(curveCardinal);
    svg
      .selectAll('path')
      .data([data])
      .join('path')
      .attr('d', value => myLine(value))
      .attr('fill', 'none')
      .attr('stroke', 'blue');
  }, [data]);

  return (
    <>
      <div className="view">
        <svg ref={svgRef}></svg>
      </div>
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
