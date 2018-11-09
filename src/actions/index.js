import {
    SET_RECEIVE,
    SET_SIGNIN,
    STORE_MESSAGE_SEND,
    SET_FILTER
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

export const storeMessageSend = (text) => ({
    type: STORE_MESSAGE_SEND,
    text: text
});

export const setFilter = (filter) => ({
    type: SET_FILTER,
    filter: filter
});