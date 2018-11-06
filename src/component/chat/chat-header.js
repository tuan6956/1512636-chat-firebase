import React, { Component } from 'react';

class ChatHeader extends Component {
    render() {
        return (
            <div className="chat-header clearfix">
                <img src={this.props.avatar} alt="avatar" />

                <div className="chat-about">
                    <div className="chat-with">{"Chat with " + this.props.name}</div>
                    
                    <div className="chat-num-messages">
                    <i class={"fa fa-circle " + this.props.statusIcon}></i> {this.props.status}</div>
                </div>
                <i className="fa fa-star"></i>
            </div>
        );
    }
}
export default ChatHeader;
