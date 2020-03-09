import userReducer from "./userReducer"
import exercisesReducer from "./exercisesReducer"
import trainingsReducer from "./trainingsReducer"
import groupsReducer from "./groupsReducer"
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import promise from 'redux-promise-middleware';
import { updateTraining } from '../../redux/actions/trainingsAction';

import {
    ADD_EXERCISE_FULFILLED,
} from '../actions/types';

const mongoMiddleware = store => next => action => {

    //ON ADDITION EXERCISE TO TRAINING
    if (action.type === ADD_EXERCISE_FULFILLED && (action.payload.data.pattern===false)) {

        const storeState = store.getState();
        const updatedTraining = storeState.trainings.currentTraining;

        updatedTraining.exercises.push(action.payload.data._id);
        next(updateTraining(updatedTraining));
    }
    next(action);
}

export const rootReducer = combineReducers({
    user: userReducer,
    exercises: exercisesReducer,
    trainings: trainingsReducer,
    groups: groupsReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(mongoMiddleware, promise)));

export default store