import React from 'react';
import { Flex, Heading, Text } from '@aws-amplify/ui-react';

const DataOutput = () => {
    const [showUrlButton, setShowUrlButton] = React.useState(false);
    return (
        <div>
            {showUrlButton && <Flex>
                <div id="request-url" style={{ marginTop: '1rem' }}>
                    <Heading level={2}>Request URL:</Heading>
                    <Text>{/* Display request URL content */}</Text>
                </div>

                <div id="raw-data" style={{ marginTop: '1rem' }}>
                    <Heading level={2}>Returned Raw Data:</Heading>
                    <Text>{/* Display returned raw data content */}</Text>
                </div>
            </Flex>}
        </div>
    );
};

export default DataOutput;