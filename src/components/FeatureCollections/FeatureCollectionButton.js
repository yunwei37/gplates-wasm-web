import React from 'react';
import { Button } from '@aws-amplify/ui-react';

const FeatureCollectionButton = ({ label, color, onClick }) => {
  return (
    <Button size="small" variant="link" onClick={onClick} color={color}>
      {label}
    </Button>
  );
};

export default FeatureCollectionButton;
