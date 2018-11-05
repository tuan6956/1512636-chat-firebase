import React, { Component } from 'react';

class ChatHeader extends Component {
    render() {
        return (
            <div class="chat-header clearfix">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />

                <div class="chat-about">
                    <div class="chat-with">{"Chat with Vincent Porter"}</div>
                    <div class="chat-num-messages">{"already 1 902 messages"}</div>
                </div>
                <i class="fa fa-star"></i>
            </div>
        );
    }
}
export default ChatHeader;
