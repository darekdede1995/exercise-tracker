import {
    FETCH_EXERCISES_FULFILLED,
    ADD_EXERCISE_FULFILLED,
    REMOVE_EXERCISE_FULFILLED,
    DROP_EXERCISES,
} from '../actions/types';

const exercisesReducer = (state = [], action) => {

    switch (action.type) {
        case FETCH_EXERCISES_FULFILLED:
            return {
                ...state, 
                exercises: action.payload.data}
        case ADD_EXERCISE_FULFILLED:
                return {
                ...state, 
                exercises: [...state.exercises, action.payload.data],
                }
        case REMOVE_EXERCISE_FULFILLED:
            return {
                ...state,
                exercises: [...state.exercises.filter((exercise) => exercise._id !== action.payload.data)]
            };
        case DROP_EXERCISES:
            return {
                ...state,
                exercises: []
            }
        default:
            return {
                ...state
            }
    }
}

export default exercisesReducer