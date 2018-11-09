import { combineReducers } from 'redux'
import { firebaseReducer as firebase } from 'react-redux-firebase'
import SetReceive from './SetReceive'
import SetAuthentication from './SetAuthentication'
import StoreMessageSend from './SetChatInput'
import SetListPeople from './SetListPeople'



const rootReducer = combineReducers({
  firebase,
  SetReceive,
  SetAuthentication,
  StoreMessageSend,
  SetListPeople,
})

export default rootReducer
