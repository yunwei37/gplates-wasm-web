import React, { useState } from 'react';
import { Flex, Button } from '@aws-amplify/ui-react';

function Tabs({ tabs, onTabChange }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <Flex gap="0.5rem">
      {tabs.map((tab, index) => (
        <Button
          key={index}
          onClick={() => handleTabClick(tab)}
          variation={activeTab === tab ? 'primary' : 'default'}
        >
          {tab}
        </Button>
      ))}
    </Flex>
  );
}

export default Tabs;