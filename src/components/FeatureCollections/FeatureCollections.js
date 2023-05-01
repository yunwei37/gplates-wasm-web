import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  View,
} from '@aws-amplify/ui-react';

const featureCollectionsData = [
  {
    id: 1,
    name: 'Feature Collection 1',
    format: 'GPlates',
  },
  {
    id: 2,
    name: 'Feature Collection 2',
    format: 'GPlates',
  },
  {
    id: 3,
    name: 'Feature Collection 3',
    format: 'GPlates',
  },
];

function FeatureCollections() {
  return (
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
            <TableRow key={featureCollection.id}>
              <TableCell>{featureCollection.name}</TableCell>
              <TableCell>{featureCollection.format}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  variant="link"
                  onClick={() => console.log('Upload')}
                  color="#1E3A8A"
                >
                  Upload
                </Button>
                <Button
                  size="small"
                  variant="link"
                  onClick={() => console.log('Download')}
                  color="#1E3A8A"
                >
                  Download
                </Button>
                <Button
                  size="small"
                  variant="link"
                  onClick={() => console.log('Edit')}
                  color="#1E3A8A"
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="link"
                  onClick={() => console.log('View')}
                  color="#1E3A8A"
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </View>
  );
}

export default FeatureCollections;
