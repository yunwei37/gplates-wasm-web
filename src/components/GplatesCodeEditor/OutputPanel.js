import React from 'react';
import { Button, Flex, Heading, ScrollView, Text } from '@aws-amplify/ui-react';

const OutputPanel = ({ runCode }) => {
  return (
    <Flex direction="column" style={{ flex: 1, marginRight: '24px' }}>
      <Heading level={2}>Output</Heading>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#f0f0f0',
          color: '#333',
          overflowY: 'scroll',
          padding: '16px',
          borderRadius: '4px',
          marginBottom: '16px',
        }}
      >
        <Text id="output"></Text>
      </ScrollView>
      <Button variation="cta" onClick={runCode}>
        Run
      </Button>
    </Flex>
  );
};

export default OutputPanel;
