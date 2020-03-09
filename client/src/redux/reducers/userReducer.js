import {
    FETCH_USER_FULFILLED,
    DROP_USER
} from '../actions/types';

const userReducer = (state = '', action) => {
    switch (action.type) {
        case FETCH_USER_FULFILLED:
            return {...state, user: action.payload.data}
        case DROP_USER:
            return ''
        default:
            return {
                ...state
            }
    }
}

export default userReducer