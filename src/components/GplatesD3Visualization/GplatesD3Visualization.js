// src/components/GplatesD3Visualization/GplatesD3Visualization.js
import React, { useRef, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  SelectField,
  SliderField,
  TextField,
  Text,
  TextAreaField,
} from '@aws-amplify/ui-react';

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
          <div style={{ width: '960px', textAlign: 'center', margin: '0 auto' }}>
            <h1 id="time-label" style={{ fontSize: '3em', margin: '0' }}>
              140 Ma
            </h1>
          </div>
          <div style={{ width: '962px', overflow: 'hidden', margin: '0 auto' }}>
            <svg className="svg-container" ref={svgRef} style={{ width: '960px', height: '500px' }}></svg>
          </div>
        </Flex>
        <Flex
          direction="column"
          alignItems="stretch"
          justifyContent="space-between"
          className="sidebar"
          style={{ minWidth: '320px', padding: '1rem' }}
        >
          <Heading level={2}>Controls</Heading>
          <Grid
            columns="repeat(auto-fit, minmax(240px, 1fr))"
            gap="1rem"
            style={{ marginTop: '1rem' }}
          >
            <TextField
              id="recon-time"
              type="number"
              min="0"
              step="1"
              max="550"
              value={reconTime}
              onChange={(event) => setReconTime(event.target.value)}
              label="Time"
            />

            <SelectField
              label="View"
              value={viewName}
              onChange={(event) => setViewName(event.target.value)}
            >
              <option value="points">Points</option>
              <option value="coastlines">Coastlines</option>
              <option value="feature_collection">Feature Collection</option>
            </SelectField>

            <SelectField
              label="Projection"
              id="select-projection"
              defaultValue="equirectangular"
              onChange={() => { }}
            >
              <option value="orthographic">Orthographic</option>
              <option value="equirectangular">Rectangular</option>
            </SelectField>

            <TextAreaField
              id="args-textarea"
              rows="2"
              cols="100"
              label="Points"
              defaultValue="116,39,151,-33, -74, 40, 37, 55, -43,-22, 18, 14"
            />
          </Grid>

          <Flex gap="1rem" style={{ marginTop: '1rem' }}>
            <Button id="commit">Refresh Map</Button>
            <Button id="show-url">Show Request URL</Button>
            <Button id="show-data">Show Returned Raw Data</Button>
          </Flex>

          <div id="request-url" style={{ marginTop: '1rem' }}>
            <Heading level={2}>Request URL:</Heading>
            <Text>{/* Display request URL content */}</Text>
          </div>

          <div id="raw-data" style={{ marginTop: '1rem' }}>
            <Heading level={2}>Returned Raw Data:</Heading>
            <Text>{/* Display returned raw data content */}</Text>
          </div>
        </Flex >
      </Flex >
    </div >
  );
};

export default GplatesD3Visualization;
