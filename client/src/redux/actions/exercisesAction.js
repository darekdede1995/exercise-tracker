import axios from "axios";

import {
    FETCH_EXERCISES,
    DROP_EXERCISES,
    ADD_EXERCISE,
    REMOVE_EXERCISE
} from './types';

export const fetchExercises = userid => ({
    type: FETCH_EXERCISES,
    payload: axios.get(process.env.REACT_APP_API_URL+'/api/exercises/' + userid)
})

export const dropExercises = () => ({
    type: DROP_EXERCISES,
    payload: {
        completed: false
    }
})

export const addExercise = exercise => ({
    type: ADD_EXERCISE,
    payload: axios.post(process.env.REACT_APP_API_URL+'/api/exercises/add', exercise),
})

export const removeExercise = exercise => ({
    type: REMOVE_EXERCISE,
    payload: axios.delete(process.env.REACT_APP_API_URL+'/api/exercises/'+ exercise._id)
})
