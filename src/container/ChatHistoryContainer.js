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
    isImageByType(url) {
        return(url.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) != null);
    }
    isValidURL(string) {
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (res == null)
          return false;
        else
          return true;
      };
    isImageByFetch(url, timeoutT) {
        return new Promise(function(resolve, reject) {
          var timeout = timeoutT || 5000;
          var timer, img = new Image();
          img.onerror = img.onabort = function() {
              clearTimeout(timer);
                reject("error");
          };
          img.onload = function() {
               clearTimeout(timer);
               resolve("success");
          };
          timer = setTimeout(function() {
              reject("timeout");
          }, timeout); 
          img.src = url;
        });
    }
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
        var time = dateFormat(date2, "H:MM:ss");

        // month - 1 because January == 0
        var diff = today.getTime() - compDate.getTime(); // get the difference between today(at 00:00:00) and the date
        if (compDate.getTime() == today.getTime()) {
            return time + ", Today";
        } else if (diff <= (24 * 60 * 60 * 1000)) {
            return time + ", Yesterday";
        } else {
            time = dateFormat(date2, "H:MM:ss, mmm dd yyyy");
            return time ; // or format it what ever way you want
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
        //console.log(myUid);
        
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
        console.log(this.props.firebase);
        const listChat = chats.map(chat => {
            var message = chat.message.trim();
            var isImage = false;
            var message;
            
            if(this.isImageByType(message) && this.isValidURL(message)) {
                isImage = true;
            }
            if (chat.from === myUid) {
                return (
                    <ChatSend
                        key={chat.createAt} name={this.props.auth.displayName} message={chat.message} isImage={isImage} time={this.getDisplayDate(chat.createAt)}>
                    </ChatSend>
                )
            } else {
                return (
                    <ChatReceive
                        key={chat.createAt} name={this.props.receiver.name} message={chat.message} isImage={isImage} time={this.getDisplayDate(chat.createAt)}>
                    </ChatReceive>
                )
            }
        });

        return (
            <div className="chat-history">
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
