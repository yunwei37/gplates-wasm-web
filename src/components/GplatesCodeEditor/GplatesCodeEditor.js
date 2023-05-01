import React from 'react';
import '../../styles/colors.css';
import '../../styles/App.css';
import { useState } from 'react';
import APIKeyDialog from './ApiKeyDialog'
import Editor from './Editor';
import Chat from './Chat';

import ChatMessage from './ChatMessage';
import AI from '../model/AI';

function GplatesCodeEditor() {
	const [js, setJs] = useState("");
	const [messages, setMessages] = useState([]);

	const [loadingResponse, setLoadingResponse] = useState(false);

	const [usedTokens, setUsedTokens] = useState("0");
	const [moneySpent, setMoneySpent] = useState("0.00");

	// Show a Dialog if the API key is not set in the localStorage yet or if it is not valid
	const [isCheckingAPIKey, setIsCheckingAPIKey] = useState(false);
	const [showAPIKeyDialog, setShowAPIKeyDialog] = useState(!AI.isInitialized && !localStorage.getItem("api_key"));

	if (localStorage.getItem("api_key") && !AI.isInitialized && !isCheckingAPIKey) {
		checkAPIKeyValidity();
	}

	function checkAPIKeyValidity() {
		setIsCheckingAPIKey(true);
		AI.checkAPIKey(localStorage.getItem("api_key")).then((isValid) => {
			if (isValid) {
				AI.initWithKey(localStorage.getItem("api_key"));
				setShowAPIKeyDialog(false);
			} else {
				localStorage.removeItem("api_key");
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
			new ChatMessage("user", message_text, js)
		]
		setMessages(newMessages);

		AI.getResponseMessage(newMessages).then(responseMessage => {
			setMessages([...newMessages, responseMessage]);
			setLoadingResponse(false);

			let _used_tokens = AI.totalUsedTokens;
			let _money_spent = AI.totalUsedTokensUSD.toFixed(4);
			if (AI.totalUsedTokens > 1000) _used_tokens = Math.round(AI.totalUsedTokens / 1000) + "k";
			if (AI.totalUsedTokens > 1000000) _used_tokens = Math.round(AI.totalUsedTokens / 1000000) + "M";
			setUsedTokens(_used_tokens);
			setMoneySpent(_money_spent);

			if (responseMessage.js) setJs(responseMessage.js);
		});
	}

	return (
		<div className="App">
			<APIKeyDialog show={showAPIKeyDialog} loading={isCheckingAPIKey} checkAPIKeyValidity={checkAPIKeyValidity} />
			<div className="container">
				<div>
					<Editor language="javascript" displayName="JS" value={js} onChange={setJs} />
				</div>
				<div style={{ width: "600px" }}>
					<Chat messages={messages} addMessage={addMessage} loadingResponse={loadingResponse} usedTokens={usedTokens} moneySpent={moneySpent} />
				</div>
			</div>
		</div>
	);
}

export default GplatesCodeEditor;
