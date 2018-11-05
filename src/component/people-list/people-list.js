import React, { Component } from 'react';
import People from './people'
import Search from './search'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

class PeopleList extends Component {
    render() {
        if (!isLoaded(this.props.users)) {
            return <div>Loading...</div>
        }
        if (isEmpty(this.props.users)) {
            return <div>Users List Is Empty</div>
        }
        console.log(this.props.users);
        const listPeople = this.props.users.map(user => <People key={user.key} image={user.value.avatarUrl} name={user.value.displayName}> </People>);
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
        { path: '/users' } // string equivalent 'todos'
    ]), // withFirebase can also be used
    connect(({ firebase: { auth, ordered } }) => ({ auth, users: ordered.users }))
)(PeopleList)
