import React, { Component } from 'react';

class ChatReceive extends Component {
    render() {
        return (
            <li>
                <div className="message-data">
                    <span className="message-data-name"><i className="fa fa-circle online"></i> {this.props.name}</span>
                    <span className="message-data-time">{this.props.time}</span>
                </div>
                <div className="message my-message">
                    {this.props.message}
                </div>
            </li>
        );
    }
}
export default ChatReceive;
