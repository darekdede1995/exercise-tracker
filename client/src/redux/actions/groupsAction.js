import axios from "axios";

import {
    FETCH_GROUPS,
    DROP_GROUPS,
    ADD_GROUP,
    REMOVE_GROUP
} from './types';

export const fetchGroups = userid => ({
    type: FETCH_GROUPS,
    payload: axios.get(process.env.REACT_APP_API_URL+'/api/groups/' + userid)
})

export const dropGroups = () => ({
    type: DROP_GROUPS,
    payload: {
        completed: false
    }
})

export const addGroup = group => ({
    type: ADD_GROUP,
    payload: axios.post(process.env.REACT_APP_API_URL+'/api/groups/add', group)
})

export const removeGroup = group => ({
    type: REMOVE_GROUP,
    payload: {
        group: group,
        completed: false
    }
})
