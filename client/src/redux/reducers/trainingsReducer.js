import {
    FETCH_TRAININGS_FULFILLED,
    DROP_TRAININGS,
    ADD_TRAINING_FULFILLED,
    REMOVE_TRAINING_FULFILLED,
    SET_TRAINING,
    UPDATE_TRAINING_FULFILLED,
} from '../actions/types';

const trainingsReducer = (state = '', action) => {
    switch (action.type) {
        case FETCH_TRAININGS_FULFILLED:
            return {
                ...state,
                trainings: [...action.payload.data]
            };
        case DROP_TRAININGS:
            return {
                ...state,
                trainings: []
            };
        case ADD_TRAINING_FULFILLED:
            return {
                ...state,
                trainings: [...state.trainings, action.payload.data],
                currentTraining: action.payload.data
            };
        case REMOVE_TRAINING_FULFILLED:
            return {
                ...state,
                trainings: [...state.trainings.filter((training) => training._id !== action.payload.data)]
            };
        case SET_TRAINING:
            return {
                ...state,
                currentTraining: action.payload
            };
        case UPDATE_TRAINING_FULFILLED:
            return {
                ...state,
                trainings: [...state.trainings.filter((training) => training._id !== action.payload.data._id), action.payload.data],
                currentTraining: action.payload.data
            };
        default:
            return {
                ...state
            }
    }
}

export default trainingsReducer