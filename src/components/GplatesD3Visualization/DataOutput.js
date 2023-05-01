import React from 'react';
import { Heading, Text } from '@aws-amplify/ui-react';

const DataOutput = () => {
    return (
        <>
            <div id="request-url" style={{ marginTop: '1rem' }}>
                <Heading level={2}>Request URL:</Heading>
                <Text>{/* Display request URL content */}</Text>
            </div>

            <div id="raw-data" style={{ marginTop: '1rem' }}>
                <Heading level={2}>Returned Raw Data:</Heading>
                <Text>{/* Display returned raw data content */}</Text>
            </div>
        </>
    );
};

export default DataOutput;