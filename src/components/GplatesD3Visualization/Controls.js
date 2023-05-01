import React from 'react';
import { Button, Grid, SelectField, TextField, TextAreaField, Flex } from '@aws-amplify/ui-react';

const Controls = ({ reconTime, setReconTime, viewName, setViewName }) => {
    return (
        <>
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
        </>
    );
};

export default Controls;