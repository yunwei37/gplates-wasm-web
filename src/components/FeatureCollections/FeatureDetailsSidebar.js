import React from 'react';
import { Flex, Heading, View, Button } from '@aws-amplify/ui-react';

const FeatureDetailsSidebar = () => {
  return (
    <View style={{ backgroundColor: "gray-100", Width: '320px', padding: '1rem' }}>
      <Flex direction="column" alignItems="stretch" justifyContent="space-between">
        <Heading level={2}>Feature Details</Heading>
        {/* Display feature details here */}
        <Button onClick={() => console.log('Do something')}>Upload new Feature</Button>
      </Flex>
    </View>
  );
};

export default FeatureDetailsSidebar;