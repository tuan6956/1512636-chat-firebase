import React, { Component } from 'react';
//import firebase from 'firebase';
import { withFirebase } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import PeopleList from '../people-list/people-list'
import ChatHeader from '../chat/chat-header'
import ChatHistory from '../chat/chat-history'
import ChatInput from '../chat/chat-input'
import ChatReceive from '../chat/chat-receive'
import ChatSend from '../chat/chat-send'
import Menu from '../Menu/menu'
import Firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

// const configFirebase = {
//     apiKey: 'AIzaSyDOAzwNU1iNprf6vUOt8d3ESdOR7ySuDoA',
//     authDomain: 'fir-chat-1512636.firebaseapp.com',
// };
// firebase.initializeApp(configFirebase);

class Login extends Component {
    state = {
        isSignedIn: false,
        uid: ''
    };
    uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
            this.props.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => false
        }
    };


    componentDidMount() {
        let unregisterAuthObserver = this.props.firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    const uid = user.uid;;
                    var lastOnlineRef = this.props.firebase.database().ref('users/' + uid + '/lastOnline');
                    var myConnectionsRef = this.props.firebase.database().ref('users/' + uid + '/connection');
                    var connectedRef = this.props.firebase.database().ref('.info/connected');
                    connectedRef.on('value', function (snap) {
                        if (snap.val() === true) {
                            var con = myConnectionsRef.set(true);
                            //con.onDisconnect().remove();

                            //  con.set(true);
                            // When I disconnect, update the last time I was seen online
                            lastOnlineRef.onDisconnect().set(Firebase.database.ServerValue.TIMESTAMP);
                            myConnectionsRef.onDisconnect().set(false);
                        }
                    });
                }
                this.setState({ isSignedIn: !!user })
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
        var connectedRef = this.props.firebase.database().ref('.info/connected');
        var con = myConnectionsRef.set(false);
        lastOnlineRef.set(Firebase.database.ServerValue.TIMESTAMP);
        this.props.firebase.logout();
    };
    render() {

        if (!this.state.isSignedIn) {
            return (
                <div className="App-header">
                    <h1>Chat App</h1>
                    <button // <GoogleButton/> button can be used instead
                        onClick={() => this.props.firebase.login({ provider: 'google', type: 'popup' })}
                    >Login With Google</button>                </div>
            );
        }
        return (

            <div className="container clearfix">
                {/* <button onClick={() => this.props.firebase.logout()}>Sign-out</button > */}
                <Menu logout={this.handleLogout} avatar={this.props.profile.avatarUrl} />
                <PeopleList />
                <div class="chat">
                    <ChatHeader />
                    <ChatHistory />
                    <ChatInput />
                </div>
            </div>
            // <div>
            //     <h1>Chat App</h1>
            //     <h1>Welcome 
            //         <p style={{ color: "yellow" }}> {this.props.profile.displayName} 
            //         </p> You are now signed-in!
            //     </h1>
            //     <button onClick={() => this.props.firebase.logout()}>Sign-out</button >
            // </div>
        );
    }
}
export default compose(
    // firebaseConnect((props) => [
    //     { path: '/users' } // string equivalent 'todos'
    //   ]), // withFirebase can also be used
    withFirebase,
    connect(({ firebase: { auth, profile } }) => ({
        auth, profile
    }))
)(Login)
//export default withFirebase(Login);
