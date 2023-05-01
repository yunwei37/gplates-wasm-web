import React, { useState } from 'react';
import { withAuthenticator, Button, Flex, Heading, View } from '@aws-amplify/ui-react';
import Tabs from '../components/Tabs/Tabs';
import FileManager from '../components/FileManager/FileManager';
import GplatesD3Visualization from '../components/GplatesD3Visualization/GplatesD3Visualization';
import GplatesCodeEditor from '../components/GplatesCodeEditor/GplatesCodeEditor';

function MainPage({ signOut }) {
  const [activeTab, setActiveTab] = useState('File Manager');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View backgroundColor="white" style={{ minHeight: "100vh" }}>
      <Flex direction={"column"} gap="1rem">
        <Flex justifyContent={'space-between'}>
          <Heading level={1}>GPlate Web</Heading>
          <Button onClick={signOut}>Sign Out</Button>
        </Flex>
        <Tabs tabs={['File Manager', 'Gplates D3 Visualization', 'Gplates Code Editor']} onTabChange={handleTabChange} />
        <div style={{ display: activeTab === 'File Manager' ? 'block' : 'none' }}>
          <FileManager />
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