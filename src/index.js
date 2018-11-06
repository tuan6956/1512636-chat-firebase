import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import rootReducer from './reducers'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import * as serviceWorker from './serviceWorker';
import config from './config/Config';
import firebase from 'firebase'

firebase.initializeApp(config.firebaseConfig);
const rrfConfig = {
    userProfile: 'users',
    presence: 'presence',
    // sessions: 'sessions'
}

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), 
)(createStore)
//const store = createStore(rootReducer)

const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
