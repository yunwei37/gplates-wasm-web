import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Flex,
  View,
} from '@aws-amplify/ui-react';
import FeatureCollectionButton from './FeatureCollectionButton';
import FeatureDetailsSidebar from './FeatureDetailsSidebar';
import { featureCollectionsData } from './data';

function FeatureCollections() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleViewClick = (feature) => {
    setSelectedFeature(feature);
    console.log('View', feature);
  };

  return (
    <Flex direction="row" padding="1rem">
      <View padding="1rem">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Format</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {featureCollectionsData.map((featureCollection) => (
              <TableRow>
                <TableCell>{featureCollection.name}</TableCell>
                <TableCell>{featureCollection.format}</TableCell>
                <TableCell>
                  <FeatureCollectionButton
                    label="Upload"
                    color="#1E3A8A"
                    onClick={() => console.log('Upload')}
                  />
                  <FeatureCollectionButton
                    label="Download"
                    color="#1E3A8A"
                    onClick={() => console.log('Download')}
                  />
                  <FeatureCollectionButton
                    label="Delete"
                    color="#1E3A8A"
                    onClick={() => console.log('Delete')}
                  />
                  <FeatureCollectionButton
                    label="Edit"
                    color="#1E3A8A"
                    onClick={() => console.log('Edit')}
                  />
                  <FeatureCollectionButton
                    label="View"
                    color="#1E3A8A"
                    onClick={() => handleViewClick(featureCollection)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </View>
      <FeatureDetailsSidebar featureData={selectedFeature} />
    </Flex>
  );
}

export default FeatureCollections;
