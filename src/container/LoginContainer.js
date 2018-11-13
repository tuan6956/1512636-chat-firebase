import React, { Component } from 'react';
//import firebase from 'firebase';
import { withFirebase } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';


class LoginContainer extends Component {

    render() {
        return (
            <div className="App-header">
                <h1>Chat App</h1>

                <Button className="login-btn" variant="contained" color="primary" size="large" aria-label="Edit" 
                    onClick={() => this.props.firebase.login({ provider: 'google', type: 'popup' })}
                    >
                    <i className="fab fa-google" style={{paddingRight: "10px"}}></i>

                    Login With Google
                </Button>
            </div>
        );

    }
}

export default compose(
    withFirebase,
    connect(({ firebase: { auth, profile } }) => ({
        auth, profile
    }))
)(LoginContainer)
