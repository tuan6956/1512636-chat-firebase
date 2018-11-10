import React, { Component } from 'react';

class ChatReceive extends Component {
    render() {
        var message;
        if (this.props.isImage) {
            message = (
                <div className="message my-message">
                    <p> <a href={this.props.message}> {this.props.message} </a> </p>
                    <br />
                    <img src={this.props.message} />
                </div>
            )
        } else {
            message = (
                <div className="message my-message">
                    {this.props.message}
                </div>
            )
        }
        return (
            <li>
                <div className="message-data">
                    <span className="message-data-name"><i className="fa fa-circle online"></i> {this.props.name}</span>
                    <span className="message-data-time">{this.props.time}</span>
                </div>
                {message}
            </li>
        );
    }
}
export default ChatReceive;
