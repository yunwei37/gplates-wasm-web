import React, { useCallback, useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { withAuthenticator, Button, Text, Flex, Heading } from '@aws-amplify/ui-react';
import { createNote, deleteNote } from '../graphql/mutations';
import { listNotes } from '../graphql/queries';
import Tabs from '../components/Tabs/Tabs';
import FileManager from '../components/FileManager/FileManager';
import GplatesD3Visualization from '../components/GplatesD3Visualization/GplatesD3Visualization';
import GplatesCodeEditor from '../components/GplatesCodeEditor/GplatesCodeEditor';

function MainPage({ signOut }) {
  const [notes, setNotes] = useState([]);
  const [activeTab, setActiveTab] = useState('Tab1');

  const fetchNotes = useCallback(async () => {
    const result = await API.graphql({
      query: listNotes,
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
    setNotes(result.data.listNotes.items)
  }, [setNotes])

  const handleCreateNote = useCallback(async () => {
    await API.graphql({
      query: createNote,
      variables: { input: { text: window.prompt("New note") } },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
    fetchNotes()
  }, [fetchNotes])

  const handleDeleteNote = useCallback(async (id) => {
    await API.graphql({
      query: deleteNote,
      variables: { input: { id: id } },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
    fetchNotes()
  }, [fetchNotes])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Flex direction={"column"}>
      <Tabs tabs={['Tab1', 'Tab2', 'Tab3']} onTabChange={handleTabChange} />
      {activeTab === 'File Manager' && <FileManager />}
      {activeTab === 'Gplates D3 Visualization' && <GplatesD3Visualization />}
      {activeTab === 'Gplates Code Editor' && <GplatesCodeEditor />}
      <Flex justifyContent={'space-between'}>
        <Heading level={1}>My notes</Heading>
        <Button onClick={signOut}>Sign Out</Button>
      </Flex>
      {notes.map(note => <Flex alignItems={'center'}>
        <Text>{note.text}</Text>
        <Button onClick={() => handleDeleteNote(note.id)}>Remove</Button>
      </Flex>)}
      <Button onClick={handleCreateNote}>Add Note</Button>
    </Flex>
  );
}

export default withAuthenticator(MainPage);
