import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
// import GoogleButton from 'react-google-button' // optional

export const LoginPage = ({ firebase, auth }) => {
    console.log(firebase);
    return (
        <div>
            <button // <GoogleButton/> button can be used instead
                onClick={() => firebase.login({ provider: 'google', type: 'popup' })}
            >Login With Google</button>
            <button // <GoogleButton/> button can be used instead
                onClick={() => firebase.logout()}
            >Logout</button>
            <div>
                <h2>Auth</h2>
                {
                    !isLoaded(auth)
                        ? <span>Loading...</span>
                        : isEmpty(auth)
                            ? <span>Not Authed</span>
                            : <pre>{JSON.stringify(auth, null, 2)}</pre>
                }
            </div>
        </div>
    )
}

LoginPage.propTypes = {
    firebase: PropTypes.shape({
        login: PropTypes.func.isRequired
    }),
    auth: PropTypes.object
}

export default compose(
    firebaseConnect(), // withFirebase can also be used
    connect(({ firebase: { auth } }) => ({ auth }))
)(LoginPage)