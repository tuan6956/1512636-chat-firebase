import React, { Component } from 'react';

class ChatSend extends Component {
    render() {
        var message;
        if (this.props.image) {
            message = (
                <div className="message other-message float-right">
                    <p> <a href={this.props.message}> {this.props.message} </a> </p>
                    <br />
                    <img src={this.props.image} />
                </div>
            )
        } else {
            message = (
                <div className="message other-message float-right">
                    {this.props.message}
                </div>
            )
        }
        return (
            <li className="clearfix">
                <div className="message-data align-right">
                    <span className="message-data-time" >{this.props.time}</span> &nbsp; &nbsp;
                    <span className="message-data-name" >{this.props.name}</span> <i className="fa fa-circle me"></i>
                </div>
                {message}
            </li>
        );
    }
}
export default ChatSend;
