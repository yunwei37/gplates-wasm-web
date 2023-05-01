// src/components/GplatesD3Visualization/GplatesD3Visualization.js
import React, { useRef, useEffect, useState } from 'react';
import { reconstructionFunction } from './reconstruction';
import './GplatesD3Visualization.css';

const GplatesD3Visualization = () => {
  const [reconTime, setReconTime] = useState(140);
  const svgRef = useRef();

  useEffect(() => {
    // 调用 reconstructionFunction，并将 svgRef 传递给它
    reconstructionFunction(svgRef);
  }, []);

  return (
    <div className="gplates-d3-visualization">
      <div style={{ width: '960px', textAlign: 'center', margin: '0 auto' }}>
        <h1 id="time-label" style={{ fontSize: '3em', margin: '0' }}>
          140 Ma
        </h1>
      </div>
      <div style={{ width: '962px', overflow: 'hidden', margin: '0 auto' }}>
        <svg ref={svgRef} style={{ width: '960px', height: '500px' }}></svg>
        <div style={{ textAlign: 'center' }}>
          <label>Time:</label>
          <input
            id="recon-time"
            type="number"
            min="0"
            step="1"
            max="550"
            value={reconTime}
            onChange={(event) => setReconTime(event.target.value)}
            style={{ marginRight: '10px' }}
          />
          <label>Projection:</label>
          <select id="select-projection" style={{ marginRight: '10px' }}>
            <option value="orthographic">Orthographic</option>
            <option value="equirectangular" selected>Rectangular</option>
          </select>
          <label style={{ display: "none" }}>Function:</label>
          <select id="select-function" style={{ display: 'none' }}>
            <option value="1" selected>Reconstruct Points</option>
            <option value="2">Reconstruct Feature Collection</option>
          </select>
          <br />
          <textarea id="args-textarea" rows="2" cols="100">116,39,151,-33, -74, 40, 37, 55, -43,-22, 18, 14</textarea>
          <br />
          <input type="button" id="commit" value="Refresh Map" />
          <input type="button" id="show-url" value="Show Request URL" />
          <input type="button" id="show-data" value="Show Returned Raw Data" />
        </div>
        <br />
        <div id="request-url"></div>
        <br />
        <div id="raw-data"></div>
      </div>
    </div>
  );
};

export default GplatesD3Visualization;
