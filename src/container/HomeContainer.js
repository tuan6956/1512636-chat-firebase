import React, { Component } from 'react';
//import firebase from 'firebase';
import { withFirebase, isEmpty, isLoaded } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PeopleListContainer from './PeopleListContainer'
import Menu from '../component/Menu/menu'

import Firebase from 'firebase'
import { setSignin, setStarPeople } from '../actions'

import LoginContainer from './LoginContainer'
import ChatBox from '../component/chat/chat-box';

class HomeContainer extends Component {

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    const uid = user.uid;;
                    var lastOnlineRef = this.props.firebase.database().ref('users/' + uid + '/lastOnline');
                    var myConnectionsRef = this.props.firebase.database().ref('users/' + uid + '/connection');
                    var connectedRef = this.props.firebase.database().ref('.info/connected');
                    connectedRef.on('value', function (snap) {
                        if (snap.val() === true) {
                            myConnectionsRef.set(true);
                            lastOnlineRef.onDisconnect().set(Firebase.database.ServerValue.TIMESTAMP);
                            myConnectionsRef.onDisconnect().set(false);
                        }
                    });
                }
                this.props.setIsSignin(!!user);
            }
        );
    }

    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    handleLogout = () => {
        const uid = this.props.auth.uid;;
        var lastOnlineRef = this.props.firebase.database().ref('users/' + uid + '/lastOnline');
        var myConnectionsRef = this.props.firebase.database().ref('users/' + uid + '/connection');
        myConnectionsRef.set(false);
        lastOnlineRef.set(Firebase.database.ServerValue.TIMESTAMP);
        this.props.firebase.logout();
    };

    handleStarPeople = () => {

        this.props.doSetStarPeople(!this.props.receiver.star);

        var me = this.props.auth.uid;
        var receiveId = this.props.receiver.uid;

        var timeNow = new Date().getTime();
        
        var starRef = this.props.firebase.database().ref('users/' + me + '/stars/' + receiveId);
        if(this.props.receiver.star) {
            starRef.remove();
        } else {
            starRef.set(timeNow);
        }

    }


    render() {
        if(!isLoaded(this.props.auth) ){
            return (<div className="loader"> </div>)
        }
        if (!this.props.isSignId) {
            return (
                <LoginContainer />
            );
        } else {
            return (
                <div className="container clearfix">
                    {/* <button onClick={() => this.props.firebase.logout()}>Sign-out</button > */}
                    <Menu logout={this.handleLogout} avatar={this.props.profile.avatarUrl} />
                    {/* <Search /> */}

                    <PeopleListContainer />
                    <ChatBox receiver={this.props.receiver} star={this.handleStarPeople.bind(this)}/>
                </div>
            );
        }

        
    }
}
const mapDispatchToProps = dispatch => {
    return({
        setIsSignin: isSignin => dispatch(setSignin(isSignin)),
        doSetStarPeople: isStar => dispatch(setStarPeople(isStar))
    })
}
export default compose(
    withFirebase,
    connect(
        ({ 
            firebase: { auth, profile }, 
            SetAuthentication: {isSignId}, 
            SetReceive: {uid, name, avatar, statusConnection, statusIcon, star},
            SetListPeople: {filter} 
        }) => ({
            auth, 
            profile, 
            isSignId, 
            receiver: {uid, name, statusConnection, avatar, statusIcon, star}, 
            filter: filter
        })
        , mapDispatchToProps)
)(HomeContainer)
