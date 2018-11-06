import {
    SET_RECEIVE,
} from '../constants/ActionType'

const defaultReceive = { uid: '', name: '', avatar: '', statusConnection: 'offline', statusIcon: 'offline'};
const doSetReceive = (state = defaultReceive, action) => {
    switch (action.type) {
        case SET_RECEIVE:
            return {
                uid: action.uid,
                name: action.name,
                statusConnection: action.statusConnection,
                avatar: action.avatar,
                statusIcon: action.statusIcon
            }
        default:
            return state;
    }
}
export default doSetReceive;