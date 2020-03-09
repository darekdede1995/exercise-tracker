import axios from "axios";

import {
    FETCH_USER,
    DROP_USER
} from './types';

export const fetchUser = userid => ({
    type: FETCH_USER,
    payload: axios.get(process.env.REACT_APP_API_URL+'/api/users/' + userid)
})

export const dropUser = () => ({
    type: DROP_USER,
    payload: {
        completed: false
    }
})