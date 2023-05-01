import React, { useState } from 'react';
import { withAuthenticator, Button, Flex, Heading, View, SearchField, Link } from '@aws-amplify/ui-react';
import Tabs from '../components/Tabs/Tabs';
import FeatureCollections from '../components/FeatureCollections/FeatureCollections';
import GplatesD3Visualization from '../components/GplatesD3Visualization/GplatesD3Visualization';
import GplatesCodeEditor from '../components/GplatesCodeEditor/GplatesCodeEditor';

function MainPage({ signOut }) {
  const [activeTab, setActiveTab] = useState('Feature Collections');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View backgroundColor="white" style={{ minHeight: "100vh" }}>
      <Flex direction={"column"} gap="0">
        <Flex justifyContent={'space-between'} backgroundColor="#1E3A8A" alignItems="center" padding="1rem">
          <Heading level={1} color="white">GPlate Web</Heading>
          <Flex gap="1rem">
            <Button backgroundColor="white" color="#1E3A8A">Help</Button>
            <Button onClick={signOut} backgroundColor="white" color="#1E3A8A">Sign Out</Button>
          </Flex>
        </Flex>
        <View backgroundColor="#E5E7EB" padding="0.5rem">
          <Tabs tabs={['Feature Collections', 'Gplates D3 Visualization', 'Gplates Code Editor']} onTabChange={handleTabChange} />
        </View>
        <div style={{ display: activeTab === 'Feature Collections' ? 'block' : 'none' }}>
          <FeatureCollections />
        </div>
        <div style={{ display: activeTab === 'Gplates D3 Visualization' ? 'block' : 'none' }}>
          <GplatesD3Visualization />
        </div>
        <div style={{ display: activeTab === 'Gplates Code Editor' ? 'block' : 'none' }}>
          <GplatesCodeEditor />
        </div>
      </Flex>
    </View >
  );
}

export default withAuthenticator(MainPage);
