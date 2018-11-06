import { combineReducers } from 'redux'
import { firebaseReducer as firebase } from 'react-redux-firebase'
import SetReceive from './SetReceive'
import SetAuthentication from './SetAuthentication'

const rootReducer = combineReducers({
  firebase,
  SetReceive,
  SetAuthentication
})

export default rootReducer
