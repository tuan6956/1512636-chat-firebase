import React, { Component } from 'react';

class ChatReceive extends Component {
    render() {
        return (
            <li>
                <div class="message-data">
                    <span class="message-data-name"><i class="fa fa-circle online"></i> {"Vincent"}</span>
                    <span class="message-data-time">{"10:12 AM, Today"}</span>
                </div>
                <div class="message my-message">
                    {"Are we meeting today? Project has been already finished and I have results to show you."}
                </div>
            </li>
        );
    }
}
export default ChatReceive;
