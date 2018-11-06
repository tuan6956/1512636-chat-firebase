import React, { Component } from 'react';
import ChatSend from '../component/chat/chat-send'
import ChatReceive from '../component/chat/chat-receive'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { setReceive } from '../actions'
import ScrollBotton from '../component/scrollboton'

var dateFormat = require('dateformat');

class ChatHistory extends Component {

    getDisplayDate(timestamp) {
        var today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        var compDate = new Date(timestamp);
        compDate.setHours(0);
        compDate.setMinutes(0);
        compDate.setSeconds(0);
        compDate.setMilliseconds(0);
        var date2 = new Date(timestamp);
        var time = dateFormat(date2, "h:MM:ss TT");

        // month - 1 because January == 0
        var diff = today.getTime() - compDate.getTime(); // get the difference between today(at 00:00:00) and the date
        if (compDate.getTime() == today.getTime()) {
            return time + ", Today";
        } else if (diff <= (24 * 60 * 60 * 1000)) {
            return time + ", Yesterday";
        } else {
            return time + ", " + compDate.toDateString(); // or format it what ever way you want
        }
    }

    render() {
        if (!isLoaded(this.props.chats)) {
            return <div>Loading...</div>
        }
        if (isEmpty(this.props.chats)) {
            return <div>Users List Is Empty</div>
        }
        const myUid = this.props.auth.uid;
        const yourUid = this.props.receiver.uid;
        //const yourUid = "50MhRSueCyQLOG5egmiXCpIOxVH3";
        console.log(myUid);
        
        var chatTemp = this.props.chats[myUid + yourUid];
        if (!chatTemp) {
            chatTemp = this.props.chats[yourUid + myUid];
            if (!chatTemp) {
                return null;
            }
        }
        var chats = Object.keys(chatTemp).map(function (key) { return chatTemp[key]; });
        chats.sort((a, b) => { return a.createAt - b.createAt });
        // console.log(this.props.receiver);

        const listChat = chats.map(chat => {

            if (chat.from === myUid) {
                return (
                    <ChatSend
                        key={chat.createAt} name={this.props.auth.displayName} message={chat.message} time={this.getDisplayDate(chat.createAt)}>
                    </ChatSend>
                )
            } else {
                return (
                    <ChatReceive
                        key={chat.createAt} name={this.props.receiver.name} message={chat.message} time={this.getDisplayDate(chat.createAt)}>
                    </ChatReceive>
                )
            }
        });

        return (
            <div class="chat-history">
                <ul>
                    {listChat}
                </ul>
                <ScrollBotton />
            </div>
        );
    }
}


export default compose(
    firebaseConnect((props) => [
        { path: '/chats' },
    ]),
    connect((
        { firebase: { auth, ordered, data },
            SetReceive: { uid, name, avatar, statusConnection, statusIcon } }
    ) => ({ auth, chats: data.chats, receiver: { uid, name, statusConnection, avatar, statusIcon } }))
)(ChatHistory)
