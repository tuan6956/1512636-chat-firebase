import {
    SET_RECEIVE, SET_STAR_PEOPLE
} from '../constants/ActionType'

const defaultReceive = {
    uid: '',
    name: '', 
    avatar: '', 
    statusConnection: 'offline', 
    statusIcon: 'offline',
    star: false,
};
const doSetReceive = (state = defaultReceive, action) => {
    switch (action.type) {
        case SET_RECEIVE:
            return {
                uid: action.uid,
                name: action.name,
                statusConnection: action.statusConnection,
                avatar: action.avatar,
                statusIcon: action.statusIcon,
                star: action.star
            }
        case SET_STAR_PEOPLE:
            return {
                ...state,
                star: action.star,
            }
        default:
            return state;
    }
}
export default doSetReceive;