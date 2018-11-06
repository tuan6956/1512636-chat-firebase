import {
    SET_SIGNIN,
} from '../constants/ActionType'

const defaultAuthentication = { isSignId: false };
const doSetAuthentication = (state = defaultAuthentication, action) => {
    switch (action.type) {
        case SET_SIGNIN:
            return {
                isSignId: action.isSignId
            }
        default:
            return state;
    }
}
export default doSetAuthentication;