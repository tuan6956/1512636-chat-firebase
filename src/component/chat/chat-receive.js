import React, { Component } from 'react';

class ChatReceive extends Component {
    render() {
        return (
            <li>
                <div class="message-data">
                    <span class="message-data-name"><i class="fa fa-circle online"></i> {this.props.name}</span>
                    <span class="message-data-time">{this.props.time}</span>
                </div>
                <div class="message my-message">
                    {this.props.message}
                </div>
            </li>
        );
    }
}
export default ChatReceive;
