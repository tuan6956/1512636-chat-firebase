import { combineReducers } from 'redux'
import { firebaseReducer as firebase } from 'react-redux-firebase'
import SetReceive from './SetReceive'
import SetAuthentication from './SetAuthentication'
import StoreMessageSend from './SetChatInput'


const rootReducer = combineReducers({
  firebase,
  SetReceive,
  SetAuthentication,
  StoreMessageSend,
})

export default rootReducer
