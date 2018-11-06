import React, { Component } from 'react';
import ChatHistoryContainer from '../../container/ChatHistoryContainer';
import ChatInput from './chat-input';
import ChatHeader from './chat-header';

class ChatBox extends Component {
    render() {
        const receiver = this.props.receiver;
        if(receiver.uid === '') {
            return (
                <div className="chat" >
                </div>
            )
        } else {
            return (
                <div className="chat">
                            <ChatHeader name={receiver.name} status={receiver.statusConnection} 
                                        avatar={receiver.avatar} statusIcon={receiver.statusIcon}/>
                            <ChatHistoryContainer />
                            <ChatInput />
                </div>
            );
        }
        
    }
}
export default ChatBox;
