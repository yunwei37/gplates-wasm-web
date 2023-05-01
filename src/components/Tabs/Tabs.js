import React, { useState } from 'react';
import { Button, ButtonGroup } from '@aws-amplify/ui-react';

function Tabs({ tabs, onTabChange }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <ButtonGroup variant="outlined">
      {tabs.map((tab, index) => (
        <Button key={index} onClick={() => onTabChange(tab)}>
          {tab}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default Tabs;