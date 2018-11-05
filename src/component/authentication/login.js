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

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

// const configFirebase = {
//     apiKey: 'AIzaSyDOAzwNU1iNprf6vUOt8d3ESdOR7ySuDoA',
//     authDomain: 'fir-chat-1512636.firebaseapp.com',
// };
// firebase.initializeApp(configFirebase);

class Login extends Component {
    state = {
        isSignedIn: false
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
        //console.log('123');
        let unregisterAuthObserver = this.props.firebase.auth().onAuthStateChanged(
            (user) => {
                console.log("user:");
                console.log(this.props.auth);
                this.setState({ isSignedIn: !!user })
            }
        );
    }

    // componentWillUpdate() {
    //     if(!this.state.isSignedIn) {
    //         this.props.firebase.
    //     }
    // }

    componentWillUnmount() {
        this.unregisterAuthObserver();
    }
    handleLogout = () => {
        this.props.firebase.logout();
    };
    render() {
        //console.log("users: " + this.props.users);
        //console.log(this.props.firebase.auth());

        if (!this.state.isSignedIn) {
            //console.log(this.props.firebase)
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
                <Menu logout={this.handleLogout} avatar={this.props.profile.avatarUrl}/>
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
