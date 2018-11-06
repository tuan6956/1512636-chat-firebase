import React, { Component } from 'react';
import People from '../component/people-list/people'
import PeopleList from '../component/people-list/people-list'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { setReceive } from '../actions'

class PeopleListContainer extends Component {
    handleClick = (user, statusText) => {
        console.log(user.value.connection);
        this.props.doSetReceive(user.key, user.value.displayName,user.value.avatarUrl, statusText, user.value.connection ? "online" : "offline")
        console.log(statusText);
    };
    render() {
        
        if (!isLoaded(this.props.users)) {
            return <div>Loading...</div>
        }
        if (isEmpty(this.props.users)) {
            return <div>Users List Is Empty</div>
        }
        
        const listPeople = this.props.users.map(user => {
            var statusIcon = 'online';
            var statusText = 'online'
            var online = user.value.connection;
            if(!online) {
                statusText = 'left ';
                statusIcon = 'offline';
                var lastOnlineTime = parseInt(user.value.lastOnline);

                var date = new Date(null);
                date.setMilliseconds(new Date().getTime() - lastOnlineTime); // specify value for SECONDS here
                var timeString = date.toISOString().substr(11, 8);
                var timeUnix = timeString.split(':');
                if(timeUnix[0].trim() !== "00") {
                    statusText += ( parseInt(timeUnix[0].trim()) + " hours ago" );
                } else if(timeUnix[1].trim() !== "00") {
                    statusText += ( parseInt(timeUnix[1].trim()) + " minutes ago" );
                } else {
                    statusText += ( parseInt(timeUnix[2].trim()) + " seconds ago" );
                }
            }
            
            return (<People key={user.key} image={user.value.avatarUrl} name={user.value.displayName} 
                            statusIcon={statusIcon} statusText={statusText} onItemClick={(() => this.handleClick(user, statusText))}> 
                </People>)
        });
        return (
            <PeopleList listPeople={listPeople} />
        );
    }
}
const mapDispatchToProps = dispatch => {
    return({
        doSetReceive: (uid, name,avatar, statusConnected, statusIcon) => dispatch(setReceive(uid, name, avatar, statusConnected, statusIcon))
    })
}
export default compose(
    firebaseConnect((props) => [
        { path: '/users' }, 
    ]), 
    connect(({ firebase: { auth, ordered, data } }) => ({ auth, users: ordered.users }), mapDispatchToProps)
)(PeopleListContainer)
