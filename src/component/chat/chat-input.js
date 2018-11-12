import React, { Component } from 'react';

class ChatInput extends Component {
    render() {
        return (
            <div className="chat-message clearfix">
                <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                {/* <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp; */}
                <button onClick={this.props.handleSendMessage("123")}>Send</button>
                <i className="fa fa-file-image-o"></i>
                
            </div>
        );
    }
}
export default ChatInput;
