import React, { Component } from 'react';
import ChatSend from '../component/chat/chat-send'
import ChatReceive from '../component/chat/chat-receive'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty, withFirebase } from 'react-redux-firebase'
import ChatInput from '../component/chat/chat-input';
import { storeMessageSend } from '../actions'

var dateFormat = require('dateformat');

class ChatHistory extends Component {

    handleSendMessage() {
        var from = this.props.auth.uid;
        var to = this.props.receiver.uid;
        var key = from + to;
        var chatTemp = this.props.chats[key];
        if (!chatTemp) {
            key = to + from;
        }

        var chatRef = this.props.firebase.database().ref('chats/' + key);
        var timeNow = new Date().getTime();
        var data = {
            from: from,
            to: to,
            message: this.props.messageSend,
            createAt: timeNow
        }
        this.props.doStoreMessage('');
        chatRef.push(data);
        var lastUserToActive = this.props.firebase.database().ref('users/' + from + '/lastUserActive/' + to);
        lastUserToActive.set(timeNow);

        var lastUserFromActive = this.props.firebase.database().ref('users/' + to + '/lastUserActive/' + from);
        lastUserFromActive.set(timeNow);


    };
    handleChange(e) {
        if (e.target.value !== this.props.messageSend) {
            this.props.doStoreMessage(e.target.value);
        }
    };
    render() {
        return (
            <div className="chat-message clearfix">
                <textarea onChange={this.handleChange.bind(this)} name="message-to-send" 
                            id="message-to-send" placeholder="Type your message" rows="3" 
                            value={this.props.messageSend}></textarea>
                <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                <i className="fa fa-file-image-o"></i>
                <button onClick={this.handleSendMessage.bind(this)}>Send</button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return({
        doStoreMessage: text => {
            dispatch(storeMessageSend(text))
        }
    })
}
export default compose(
    firebaseConnect((props) => [
        { path: '/chats' },
    ]),
    connect((
        { 
            firebase: { auth, ordered, data }, 
            SetReceive:{uid, name, avatar, statusConnection, statusIcon}, StoreMessageSend}
            ) => ({ auth, chats: data.chats, receiver: {uid, name, statusConnection, avatar, statusIcon}, messageSend: StoreMessageSend.text })
            , mapDispatchToProps)
)(ChatHistory)
