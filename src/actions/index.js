import {
    SET_RECEIVE,
    SET_SIGNIN
} from '../constants/ActionType'

export const setReceive = (uid, name, avatar, statusConnection, statusIcon) => ({
    type: SET_RECEIVE,
    uid: uid,
    name: name,
    avatar: avatar,
    statusConnection: statusConnection,
    statusIcon: statusIcon,
});

export const setSignin = (isSignId) => ({
    type: SET_SIGNIN,
    isSignId: isSignId
});