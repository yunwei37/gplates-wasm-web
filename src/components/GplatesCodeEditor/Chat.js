import '../../styles/Chat.css';
import {
  Badge,
  Button,
  Flex,
  Text,
} from '@aws-amplify/ui-react';
import TextareaAutosize from 'react-textarea-autosize';

export default function Chat({
  messages,
  addMessage,
  loadingResponse,
  usedTokens,
  moneySpent,
}) {
  const sendMessage = () => {
    const input = document.querySelector('.chat-input textarea');
    addMessage(input.value);
    input.value = '';
  };

  const onClick = (event) => {
    // if shift + enter, add a new line
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-container-inner">
        <Flex className="chat-header" alignItems="center" justifyContent="space-between">
          <Text title="Each token represents a word, a group of characters or a concept that the AI can understand.">
            <Badge>{usedTokens} tokens</Badge>
          </Text>
          <Text title="1k tokens cost $0.002 USD.">
            <Badge>$ {moneySpent}</Badge>
          </Text>
        </Flex>

        <div className="chat-messages">
          {messages.map((message, key) => {
            return <>{message.render(key)}</>;
          })}
        </div>
        <Flex className="chat-input" alignItems="center">
          <TextareaAutosize
            onKeyPress={onClick}
            disabled={loadingResponse}
          />
          <Text title="Send">
            <Button
              onClick={sendMessage}
              aria-label="Send"
              backgroundColor={'gray'}
              isLoading={loadingResponse}
              circular
            >
              Send
            </Button>
          </Text>
        </Flex>
      </div>
    </div>
  );
}
