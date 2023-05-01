import React from 'react';
import { Button, Grid, SelectField, TextField, Flex, SliderField } from '@aws-amplify/ui-react';

const Controls = ({ reconTime, setReconTime, viewName, setViewName }) => {
    const [showUrlButton, setShowUrlButton] = React.useState(false);
    const [featuresText,  setFeaturesText] = React.useState("116,39,151,-33, -74, 40, 37, 55, -43,-22, 18, 14");
    return (
        <>
            <Grid
                columns="repeat(auto-fit, minmax(240px, 1fr))"
                gap="1rem"
                style={{ marginTop: '1rem' }}
            >
                <SliderField
                    id="recon-time-slider"
                    min={0}
                    step={1}
                    max={140}
                    value={reconTime}
                    onChange={(event, value) => setReconTime(value)} // Update the onChange handler
                    label="Time (Slider)"
                />
                <TextField
                    id="recon-time"
                    type="number"
                    min="0"
                    step="1"
                    max="140"
                    value={reconTime}
                    onChange={(event) => setReconTime(event.target.value)}
                    label="Time"
                />

                <SelectField
                    label="View"
                    value={viewName}
                    defaultValue="points"
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

                    <TextField
                        label="Points"
                        id="args-textarea"
                        rows="2"
                        defaultValue="116,39,151,-33, -74, 40, 37, 55, -43,-22, 18, 14"
                        onChange={(event) => setFeaturesText(event.target.value)}
                        value={featuresText}
                    />
            </Grid>

            <Flex gap="1rem" style={{ marginTop: '1rem' }}>
                <Button id="commit">Refresh Map</Button>
                {showUrlButton && <Button id="show-url">Show Request URL</Button>}
                {showUrlButton && <Button id="show-data">Show Returned Raw Data</Button>}
            </Flex>
        </>
    );
};

export default Controls;