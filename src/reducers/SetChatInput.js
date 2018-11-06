import {
    STORE_MESSAGE_SEND,
} from '../constants/ActionType'

const defaultMessageSend = { text: ''};
const doStoreMessageSend = (state = defaultMessageSend, action) => {
    switch (action.type) {
        
        case STORE_MESSAGE_SEND:
            return {
                text: action.text
            }
        default:
            return state;
    }
}
export default doStoreMessageSend;