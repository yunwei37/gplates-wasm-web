class ChatMessage {

	constructor(role, message, js) {
		this.role = role;
		this.message = message;
		this.js = js;
	}

	render(key) {
		return (
			<div className={`chat-message ${this.role}`} key={key}>
				<div className="chat-message-content">
					{this.message}
				</div>
			</div>
		);
	}
}

export default ChatMessage;