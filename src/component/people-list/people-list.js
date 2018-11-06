import React, { Component } from 'react';
import People from './people'
import Search from './search'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Firebase from 'firebase'
class PeopleList extends Component {
    
    render() {
        
        if (!isLoaded(this.props.users)) {
            return <div>Loading...</div>
        }
        if (isEmpty(this.props.users)) {
            return <div>Users List Is Empty</div>
        }
        if (!isLoaded(this.props.onlines)) {
            return <div>Loading...</div>
        }
        if (isEmpty(this.props.onlines)) {
            return <div>Users List Is Empty</div>
        }
        console.log(this.props.sessions);
        const listPeople = this.props.users.map(user => {
            var statusIcon = 'online';
            var statusText = 'online'
            var online = user.value.connection;
            if(!online) {
                statusText = 'left ';
                statusIcon = 'offline';
                var lastOnlineTime = parseInt(user.value.lastOnline);
                console.log(lastOnlineTime);
                console.log(new Date().getTime());

                var date = new Date(null);
                date.setMilliseconds(new Date().getTime() - lastOnlineTime); // specify value for SECONDS here
                var timeString = date.toISOString().substr(11, 8);
                console.log(timeString);
                var timeUnix = timeString.split(':');
                if(timeUnix[0].trim() !== "00") {
                    statusText += ( parseInt(timeUnix[0].trim()) + " hours ago" );
                } else if(timeUnix[1].trim() !== "00") {
                    statusText += ( parseInt(timeUnix[1].trim()) + " minutes ago" );
                } else {
                    statusText += ( parseInt(timeUnix[2].trim()) + " seconds ago" );
                }
            }
            
            return (<People key={user.key} image={user.value.avatarUrl} name={user.value.displayName} statusIcon={statusIcon} statusText={statusText}> </People>)
        });
        return (
            <div class="people-list" id="people-list">
                <Search />
                <ul class="list">
                    { listPeople }
                </ul>
            </div>
        );
    }
}
export default compose(
    firebaseConnect((props) => [
        { path: '/users' }, { path:'/presence'}, {path: '/sessions',queryParams: [ 'orderByChild=createdBy' ] } // string equivalent 'todos'
    ]), // withFirebase can also be used
    connect(({ firebase: { auth, ordered, data } }) => ({ auth, users: ordered.users, onlines: data.presence, sessions: ordered.sessions }))
)(PeopleList)
