import { Button, Flex } from '@aws-amplify/ui-react';
import AI from '../model/AI';

export default function APIKeyDialog({ loading, checkAPIKeyValidity }) {
  function handleRequestClose(event) {
    console.log('Dialog closed');
    if (!AI.isInitialized) {
      event.preventDefault();
    }
  }

  function saveAPIKey() {
    const input = document.querySelector('input');
    const new_key = input.value;
    localStorage.setItem('api_key', new_key);
    checkAPIKeyValidity();
  }

  return (
      <Flex>
        <h3>Provide your OpenAI's API key</h3>
        Provide your own OpenAI's API key to use the chatbot.{' '}
        <a
          href="https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key"
          target="_blank"
          rel="noreferrer"
        >
          Where do I find my secret API key?
        </a>
        <div style={{ marginTop: '24px' }}>
          <input type="text" placeholder="sk-..." disabled={loading} />
        </div>
        <Button onClick={saveAPIKey} isLoading={loading}>
          Save
        </Button>
      </Flex>
  );
}
