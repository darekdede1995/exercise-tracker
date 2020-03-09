import {
    FETCH_GROUPS_FULFILLED,
    DROP_GROUPS,
    ADD_GROUP_FULFILLED,
    REMOVE_GROUP_FULFILLED
} from '../actions/types';

const groupsReducer = (state = '', action) => {
    switch (action.type) {
        case FETCH_GROUPS_FULFILLED:
            return {
                ...state,
                groups: action.payload.data
            }
        case DROP_GROUPS:
            return {
                ...state,
                groups: []
            }
        case ADD_GROUP_FULFILLED:
            return {
                ...state,
                groups: [...state.groups, action.payload.data]
            }
        case REMOVE_GROUP_FULFILLED:
            return {
                ...state,
                groups: [...state.groups.filter((group) => group._id !== action.payload.data._id)]
            }
        default:
            return {
                ...state
            }
    }
}

export default groupsReducer