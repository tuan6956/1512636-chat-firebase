import {
    STORE_MESSAGE_SEND,
    STORE_MESSAGE_IMAGE_SEND
} from '../constants/ActionType'

const defaultMessageSend = { text: '', image: ''};
const doStoreMessageSend = (state = defaultMessageSend, action) => {
    switch (action.type) {
        
        case STORE_MESSAGE_IMAGE_SEND:
            console.log(action);
            return {
                ...state,
                text: action.text,
                image: action.image
            }
        case STORE_MESSAGE_SEND:
            return {
                ...state,
                text: action.text,
            }
        default:
            return state;
    }
}
export default doStoreMessageSend;