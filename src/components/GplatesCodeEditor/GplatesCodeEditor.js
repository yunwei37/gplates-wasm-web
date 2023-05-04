import React, { useState, useEffect } from 'react';
import '../../styles/colors.css';
import '../../styles/App.css';
import APIKeyDialog from './ApiKeyDialog';
import Editor from './Editor';
import Chat from './Chat';
import OutputPanel from './OutputPanel';
import ChatMessage from './ChatMessage';
import AI from '../model/AI';
import {
	Badge,
	Button,
	Flex,
	Text,
} from '@aws-amplify/ui-react';

function GplatesCodeEditor() {
	const [js, setJs] = useState('');
	const [messages, setMessages] = useState([]);

	const [output, setOutput] = useState([]);
	const [loadingResponse, setLoadingResponse] = useState(false);

	const [usedTokens, setUsedTokens] = useState('0');
	const [moneySpent, setMoneySpent] = useState('0.00');

	const [isCheckingAPIKey, setIsCheckingAPIKey] = useState(false);
	const [showAPIKeyDialog, setShowAPIKeyDialog] = useState(!AI.isInitialized && !localStorage.getItem('api_key'));

	useEffect(() => {
		if (localStorage.getItem('api_key') && !AI.isInitialized && !isCheckingAPIKey) {
			checkAPIKeyValidity();
		}
	}, []);

	function checkAPIKeyValidity() {
		setIsCheckingAPIKey(true);
		AI.checkAPIKey(localStorage.getItem('api_key')).then((isValid) => {
			if (isValid) {
				console.log('api_key valid');
				AI.initWithKey(localStorage.getItem('api_key'));
				setShowAPIKeyDialog(false);
			} else {
				console.log('api_key invalid');
				localStorage.removeItem('api_key');
				setShowAPIKeyDialog(true);
			}
			setIsCheckingAPIKey(false);
		});
	}

	function addMessage(message_text) {
		if (loadingResponse) {
			console.error("Can't send message while waiting for response");
			return;
		}
		setLoadingResponse(true);

		const newMessages = [
			...messages,
			new ChatMessage('user', message_text, js),
		];
		setMessages(newMessages);

		AI.getResponseMessage(newMessages).then((responseMessage) => {
			setMessages([...newMessages, responseMessage]);
			setLoadingResponse(false);

			let _used_tokens = AI.totalUsedTokens;
			let _money_spent = AI.totalUsedTokensUSD.toFixed(4);
			if (AI.totalUsedTokens > 1000) _used_tokens = Math.round(AI.totalUsedTokens / 1000) + 'k';
			if (AI.totalUsedTokens > 1000000) _used_tokens = Math.round(AI.totalUsedTokens / 1000000) + 'M';
			setUsedTokens(_used_tokens);
			setMoneySpent(_money_spent);

			if (responseMessage.js) setJs(responseMessage.js);
		});
	}

	function runCode() {
		const outputDiv = document.querySelector('#output');
		outputDiv.innerHTML = '';

		// Redirect console.log to the output div
		console.log = function (message) {
			const outputMessage = document.createElement('div');
			outputMessage.innerText = message;
			outputDiv.appendChild(outputMessage);
		};

		try {
			// eslint-disable-next-line no-eval
			eval(js);
		} catch (error) {
			console.log('Error:', error);
		}
	}

	return (
		<Flex direction="column" className="Code" style={{ width: '100%', height: "650px" }}>
			{false && (
				<APIKeyDialog
					show={showAPIKeyDialog}
					loading={isCheckingAPIKey}
					checkAPIKeyValidity={checkAPIKeyValidity}
				/>
			)}
			<Flex direction="row" style={{ paddingTop: '16px', paddingBottom: '16px', flex: 1 }}>
				<OutputPanel runCode={runCode} style={{ width: '300px', height: "650px" }} />
				<div style={{ flex: 1, marginRight: '24px' }}>
					<h2>Code Editor</h2>
					<Editor language="javascript" displayName="JS" value={js} onChange={setJs} />
				</div>
				{false && <div style={{ width: '350px' }}>
					<h2>Chat</h2>
					<Chat
						messages={messages}
						addMessage={addMessage}
						loadingResponse={loadingResponse}
						usedTokens={usedTokens}
						moneySpent={moneySpent}
					/>
				</div>}
			</Flex>
		</Flex>
	);
}

export default GplatesCodeEditor;