import React, { useState } from 'react';
import { withAuthenticator, Button, Flex, Heading } from '@aws-amplify/ui-react';
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
    <Flex direction={"column"}>
      <Flex justifyContent={'space-between'}>
        <Heading level={1}>My App</Heading>
        <Button onClick={signOut}>Sign Out</Button>
      </Flex>
      <Tabs tabs={['File Manager', 'Gplates D3 Visualization', 'Gplates Code Editor']} onTabChange={handleTabChange} />
      {activeTab === 'File Manager' && <FileManager />}
      {activeTab === 'Gplates D3 Visualization' && <GplatesD3Visualization />}
      {activeTab === 'Gplates Code Editor' && <GplatesCodeEditor />}
    </Flex>
  );
}

export default withAuthenticator(MainPage);