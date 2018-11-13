import React, { Component } from 'react';
import People from '../component/people-list/people'
import PeopleList from '../component/people-list/people-list'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { setReceive } from '../actions'

class PeopleListContainer extends Component {
    handleClick = (user, statusText, isStar) => {
        //console.log(user.value.connection);
        this.props.doSetReceive(
            user.key, user.value.displayName, user.value.avatarUrl, 
            statusText, user.value.connection ? "online" : "offline",
            isStar
        )
        //console.log(statusText);
    };
    render() {

        if (!isLoaded(this.props.users)) {
            return <div className="loader"></div>
        }
        if (isEmpty(this.props.users)) {
            return null;
        }
        var myUser = this.props.userTemp[this.props.auth.uid];
        var lastUserActive = myUser.lastUserActive;
        var starPeople = myUser.stars;

        var arr = [];
        
        this.props.users.map(user => {
            if (user.key !== this.props.auth.uid) {
                user.star = 0;
                user.lastMessage = 0;
                if (lastUserActive && lastUserActive[user.key]) {
                    user.lastMessage = lastUserActive[user.key];
                }
                if (starPeople && starPeople[user.key]) {
                    user.star = 1;
                }
                arr.push(user);
            }

        });
        
        if (this.props.filter) {
            const filter = this.props.filter;
            arr = arr.filter(function (item) {
                return item.value.displayName.toLowerCase().search(
                    filter.toLowerCase()) !== -1;
            });
        }


        arr.sort((a, b) => {
            var starCompare = b.star - a.star;
            var lastMessageCompare = b.lastMessage - a.lastMessage;
            var nameCompare = a.value.displayName > b.value.displayName ? 1 : (a.value.displayName === b.value.dispatch ? 0 : -1) 
            
            if(starCompare !== 0) {
                return starCompare;
            }
            if(lastMessageCompare !== 0) {
                return lastMessageCompare;
            }
            return nameCompare;
        });       
        const listPeople = arr.map(user => {
            var statusIcon = 'online';
            var statusText = 'online'
            var online = user.value.connection;
            if (!online) {
                statusText = 'left ';
                statusIcon = 'offline';
                var lastOnlineTime = parseInt(user.value.lastOnline);

                var date = new Date(null);
                date.setMilliseconds(new Date().getTime() - lastOnlineTime); // specify value for SECONDS here
                var timeString = date.toISOString().substr(11, 8);
                var timeUnix = timeString.split(':');
                if (timeUnix[0].trim() !== "00") {
                    statusText += (parseInt(timeUnix[0].trim()) + " hours ago");
                } else if (timeUnix[1].trim() !== "00") {
                    statusText += (parseInt(timeUnix[1].trim()) + " minutes ago");
                } else {
                    statusText += (parseInt(timeUnix[2].trim()) + " seconds ago");
                }
            }
            var isStar = false;
            if (starPeople && starPeople[user.key]) 
                isStar = true;

            return (<People key={user.key} image={user.value.avatarUrl} name={user.value.displayName}
                statusIcon={statusIcon} statusText={statusText} star={isStar} onItemClick={(() => this.handleClick(user, statusText, isStar))}>
            </People>)
        });
        return (
            <PeopleList listPeople={listPeople} />
        );
    }
}
const mapDispatchToProps = dispatch => {
    return ({
        doSetReceive: (uid, name, avatar, statusConnected, statusIcon, isStar) => dispatch(setReceive(uid, name, avatar, statusConnected, statusIcon, isStar))
    })
}
export default compose(
    firebaseConnect((props) => [
        { path: '/users' },
    ]),
    connect(({
            firebase: { auth, ordered, data }, SetListPeople: { filter }
        }) => ({ auth, users: ordered.users, userTemp: data.users, filter: filter }), mapDispatchToProps)
)(PeopleListContainer)
