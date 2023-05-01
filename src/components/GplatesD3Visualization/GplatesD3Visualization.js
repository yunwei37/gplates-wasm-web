// src/components/GplatesD3Visualization/GplatesD3Visualization.js
import React, { useRef, useEffect, useState } from 'react';
import { Flex } from '@aws-amplify/ui-react';
import Sidebar from './Sidebar';
import { reconstructionFunction } from './reconstruction';
import './GplatesD3Visualization.css';

const GplatesD3Visualization = () => {
  const [reconTime, setReconTime] = useState(140);
  // 添加一个新的 state: viewName
  const [viewName, setViewName] = useState("coastlines");

  const svgRef = useRef();
  useEffect(() => {
    // 调用 reconstructionFunction，并将 svgRef 传递给它
    console.log('reconstructionFunction');
    reconstructionFunction(svgRef, viewName);
  }, [viewName]);

  return (
    <div className="gplates-d3-visualization">
      <Flex direction="row">
        <Flex
          direction="column"
          alignItems="center"
          style={{ flexGrow: 1 }}
        >
          {/* ... Map visualization ... */}
          <div style={{ width: '960px', textAlign: 'center', margin: '0 auto' }}>
            <h1 id="time-label" style={{ fontSize: '3em', margin: '0' }}>
              140 Ma
            </h1>
          </div>
          <div style={{ width: '962px', overflow: 'hidden', margin: '0 auto' }}>
            <svg className="svg-container" ref={svgRef} style={{ width: '960px', height: '500px' }}></svg>
          </div>
        </Flex>
        <Sidebar
          reconTime={reconTime}
          setReconTime={setReconTime}
          viewName={viewName}
          setViewName={setViewName}
        />
      </Flex>
    </div>
  );
};

export default GplatesD3Visualization;
