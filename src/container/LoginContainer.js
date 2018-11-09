import React, { Component } from 'react';
//import firebase from 'firebase';
import { withFirebase } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Firebase from 'firebase'
 
class LoginContainer extends Component {

    render() {
            return (
                <div className="App-header">
                    <h1>Chat App</h1>
                    <button 
                        onClick={() => this.props.firebase.login({ provider: 'google', type: 'popup' })}
                        >Login With Google
                    </button>               
                 </div>
            );
        
    }
}

export default compose(
    withFirebase,
    connect(({firebase: { auth, profile } }) => ({
        auth, profile
    }))
)(LoginContainer)
