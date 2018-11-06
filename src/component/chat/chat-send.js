import React, { Component } from 'react';

class ChatSend extends Component {
    render() {
        return (
            <li class="clearfix">
                <div class="message-data align-right">
                    <span class="message-data-time" >{this.props.time}</span> &nbsp; &nbsp;
                    <span class="message-data-name" >{this.props.name}</span> <i class="fa fa-circle me"></i>
                </div>
                <div class="message other-message float-right">
                    {this.props.message}
                </div>
            </li>
        );
    }
}
export default ChatSend;
