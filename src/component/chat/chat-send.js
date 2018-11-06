import React, { Component } from 'react';

class ChatSend extends Component {
    render() {
        return (
            <li class="clearfix">
                <div class="message-data align-right">
                    <span class="message-data-time" >{"10:10 AM, Today"}</span> &nbsp; &nbsp;
                    <span class="message-data-name" >{"Olia"}</span> <i class="fa fa-circle me"></i>
                </div>
                <div class="message other-message float-right">
                    {"Hi Vincent, how are you? How is the project coming along?"}
                </div>
            </li>
        );
    }
}
export default ChatSend;
