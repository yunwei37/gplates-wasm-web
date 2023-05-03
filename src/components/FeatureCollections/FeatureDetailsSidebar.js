import React from 'react';
import { Flex, Heading, View, Button, CheckboxField, TextField } from '@aws-amplify/ui-react';

const FeatureDetailsSidebar = ({ featureData }) => {
  return (
    <View style={{ backgroundColor: "gray-100", Width: '500px', padding: '1rem' }}>
      <Flex direction="column" alignItems="stretch" justifyContent="space-between">
        <Heading level={3}>Feature Details</Heading>
        {featureData &&
          <>
            <TextField label="Feature Name" value={featureData.name} />
            <TextField label="Feature format" value={featureData.format} />
            {/* Display more feature details here */}
            < Heading level={4}>Reconstruction Options</Heading>
            <Button onClick={() => console.log('Do something')}>Enable Layer</Button>
            <Button onClick={() => console.log('Do something')}>Disable Layer</Button>
            <CheckboxField label="Fill Polygons" />
            <CheckboxField label="Fill Polylines" />
          </>
        }
        <Heading level={4}>File Options</Heading>
        <Button onClick={() => console.log('Do something')}>Upload new Feature</Button>
      </Flex>
    </View >
  );
};

export default FeatureDetailsSidebar;