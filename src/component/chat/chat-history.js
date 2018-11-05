import React, { Component } from 'react';
import ChatSend from './chat-send'
import ChatReceive from './chat-receive'

class ChatHistory extends Component {
    render() {
        return (
            <div class="chat-history">
                <ul>
                    <ChatSend />
                    <ChatReceive />
                </ul>
            </div>
        );
    }
}
export default ChatHistory;
