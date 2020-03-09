import axios from "axios";

import {
    FETCH_TRAININGS,
    DROP_TRAININGS,
    ADD_TRAINING,
    REMOVE_TRAINING,
    SET_TRAINING,
    UPDATE_TRAINING,
} from './types';

export const fetchTrainings = userid => ({
    type: FETCH_TRAININGS,
    payload: axios.get(process.env.REACT_APP_API_URL+'/api/trainings/' + userid)
})

export const dropTrainings = () => ({
    type: DROP_TRAININGS,
    payload: []
})

export const addTraining = training => ({
    type: ADD_TRAINING,
    payload: axios.post(process.env.REACT_APP_API_URL+'/api/trainings/add', training)
})

export const removeTraining = training => ({
    type: REMOVE_TRAINING,
    payload: axios.delete(process.env.REACT_APP_API_URL+'/api/trainings/'+ training._id)
})

export const setTraining = training => ({
    type: SET_TRAINING,
    payload: training
})

export const updateTraining = training => ({
    type: UPDATE_TRAINING,
    payload: axios.post(process.env.REACT_APP_API_URL+'/api/trainings/update/'+ training._id, training)
})