import React, { Component } from 'react';
import ChatSend from '../component/chat/chat-send'
import ChatReceive from '../component/chat/chat-receive'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty, withFirebase } from 'react-redux-firebase'
import ChatInput from '../component/chat/chat-input';
import { storeMessageSend, storeMessageImageSend } from '../actions'
import ImageUpload from './ImageUpload'
var dateFormat = require('dateformat');

class ChatHistory extends Component {
    isImageByType(url) {
        return(url.split('?')[0].toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) != null);
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
    handleSendMessage() {
        var from = this.props.auth.uid;
        var to = this.props.receiver.uid;
        var key = from + to;
        //var chatTemp = null;
        if (this.props.chats && !this.props.chats[key]) {
            key = to + from;
        }

        var chatRef = this.props.firebase.database().ref('chats/' + key);
        var timeNow = new Date().getTime();
        var data = {
            from: from,
            to: to,
            message: this.props.messageSend,
            imageUrl: this.props.imageSend,
            createAt: timeNow
        }
        console.log(data);
        this.props.doStoreMessage('');
        var newMessageRef = chatRef.push();
        newMessageRef.set(data);
        
        var lastUserToActive = this.props.firebase.database().ref('users/' + from + '/lastUserActive/' + to);
        lastUserToActive.set(timeNow);

        var lastUserFromActive = this.props.firebase.database().ref('users/' + to + '/lastUserActive/' + from);
        lastUserFromActive.set(timeNow);

        return (newMessageRef.path.pieces_.join('/'));
    };
    handleChange(e) {
        if (e.target.value !== this.props.messageSend) {
            var urlImage = this.isValidURL(e.target.value) && this.isImageByType(e.target.value) ? e.target.value : '';
            this.props.doStoreMessageImage(e.target.value, urlImage);
        }
    };
    render() {
        
        return (
            <div className="chat-message clearfix">
                <textarea onChange={this.handleChange.bind(this)} name="message-to-send" 
                            id="message-to-send" placeholder="Type your message" rows="3" 
                            value={this.props.messageSend}></textarea>
                {/* <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp; */}
                <button onClick={this.handleSendMessage.bind(this)}>Send</button>
                {/* <i className="fa fa-file-image-o"></i> */}
                <ImageUpload doSendMessage={this.handleSendMessage.bind(this)}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return({
        doStoreMessage: (text) => {
            dispatch(storeMessageSend(text))
        },
        doStoreMessageImage: (text, image) => {
            dispatch(storeMessageImageSend(text, image))
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
            ) => ({ auth, chats: data.chats, 
                    receiver: {uid, name, statusConnection, avatar, statusIcon}, 
                    messageSend: StoreMessageSend.text,
                    imageSend: StoreMessageSend.image
                })
            , mapDispatchToProps)
)(ChatHistory)
