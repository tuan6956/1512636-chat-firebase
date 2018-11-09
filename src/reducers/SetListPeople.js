import {
    SET_FILTER,
} from '../constants/ActionType'

const defaultFilter= { filter: '' };
const doSetFilter= (state = defaultFilter, action) => {
    switch (action.type) {
        case SET_FILTER:
            return {
                filter: action.filter
            }
        default:
            return state;
    }
}
export default doSetFilter;