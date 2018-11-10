import React, { Component } from 'react';

class ChatSend extends Component {
    render() {
        return (
            <li className="clearfix">
                <div className="message-data align-right">
                    <span className="message-data-time" >{this.props.time}</span> &nbsp; &nbsp;
                    <span className="message-data-name" >{this.props.name}</span> <i className="fa fa-circle me"></i>
                </div>
                <div className="message other-message float-right">
                    {this.props.message}
                </div>
            </li>
        );
    }
}
export default ChatSend;
