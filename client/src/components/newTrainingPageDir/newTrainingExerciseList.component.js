import "../../styles/newTrainingPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTraining } from "../../redux/actions/trainingsAction";
import { removeExercise } from "../../redux/actions/exercisesAction";

function TrainingExerciseList() {
    const [exercisesList, setExercisesList] = useState([]);
    const currentTraining = useSelector(state => state.trainings.currentTraining);
    const exercises = useSelector(state => state.exercises.exercises);
    const dispatch = useDispatch();

    useEffect(() => {
        if (exercises && currentTraining) {
            setExercisesList(exercises);
        }
    }, [exercises, currentTraining]);

    return (
        <div>
            <div className="d-lg-none mobile">
                {
                    exercisesList.filter((exercise) => currentTraining.exercises.includes(exercise._id)).map(exercise => {
                        return (
                            <div key={exercise._id} className="exercise-row">
                                <div className="col-12 mt-3 pb-3 d-flex justify-content-between exercise-container exercise-list-header">
                                    <label className="col-4 vertically-middle">name</label>
                                    <label hidden={exercise.description === ''} className="col-4 vertically-middle">description</label>
                                    <label hidden={exercise.group.posses === false} className="col-3 vertically-middle">group</label>
                                </div>
                                <div className="col-12 mt-3 pb-3 d-flex justify-content-between">
                                    <label className="col-4 vertically-middle">{exercise.name}</label>
                                    <label hidden={exercise.description === ''} className="col-4 vertically-middle">{exercise.description}</label>
                                    <label hidden={exercise.group.posses === false} className="col-3 vertically-middle">{exercise.group.name}</label>
                                </div>

                                <div className="col-12 mt-3 pb-3 d-flex justify-content-between exercise-container exercise-list-header">
                                    <label hidden={exercise.repetition.posses === false} className="vertically-middle ">repetition</label>
                                    <label hidden={exercise.weight.posses === false} className="vertically-middle ">weight</label>
                                    <label hidden={exercise.distance.posses === false} className="vertically-middle ">distance</label>
                                    <label hidden={exercise.duration.posses === false} className="vertically-middle ">duration</label>
                                </div>
                                <div className="col-12 mt-3 pb-3 d-flex justify-content-between">
                                    <label hidden={exercise.repetition.posses === false} className="vertically-middle ">{exercise.repetition.amount}</label>
                                    <label hidden={exercise.weight.posses === false} className="vertically-middle ">{exercise.weight.amount}</label>
                                    <label hidden={exercise.distance.posses === false} className="vertically-middle ">{exercise.distance.amount}</label>
                                    <label hidden={exercise.duration.posses === false} className="vertically-middle ">{exercise.duration.amount}</label>
                                </div>
                            </div>
                        );
                    })
                } </div>
            <div className="d-none d-lg-inline">
                <div className="col-12 my-3 p-3 d-flex justify-content-between exercise-container exercise-list-header">
                    <label hidden={exercisesList.length === 0} className="col-3 vertically-middle">
                        name
                </label>
                    <label hidden={exercisesList.length === 0} className="col-2 vertically-middle" >
                        description
                </label>
                    <label hidden={exercisesList.length === 0} className="col-1 vertically-middle" >
                        group
                </label>
                    <div className="col-5 d-flex justify-content-around">
                        <label hidden={exercisesList.length === 0} className="vertically-middle twenty" >
                            repetition
                </label>
                        <label hidden={exercisesList.length === 0} className="vertically-middle twenty" >
                            weight
                </label>
                        <label hidden={exercisesList.length === 0} className="vertically-middle twenty" >
                            distance
                </label>
                        <label hidden={exercisesList.length === 0} className="vertically-middle twenty" >
                            duration
                </label>
                    </div>
                </div>
                {exercisesList.filter((exercise) => currentTraining.exercises.includes(exercise._id)).map(exercise => {
                    return (
                        <Exercise exercise={exercise} key={exercise._id} onDelete={onDeleteExercise} />
                    );
                })}
            </div>
        </div>

    );

    function onDeleteExercise(exercise) {

        const updatedTraining = currentTraining;
        const list = currentTraining.exercises.filter((exe) => exe !== exercise._id);
        updatedTraining.exercises = list;

        dispatch(updateTraining(updatedTraining));
        dispatch(removeExercise(exercise));
    }
}

function Exercise(props) {

    if (props.exercise) {
        return (
            <div className="col-12 my-3 d-flex justify-content-between exercise-container">
                <label className="col-3 vertically-middle">{props.exercise.name}</label>
                <label className="col-2 vertically-middle">
                    {props.exercise.description}
                </label>
                <label className="col-1 vertically-middle">
                    {props.exercise.group.name ? props.exercise.group.name : ''}
                </label>
                <div className="col-5 d-flex justify-content-around">
                    <label>{props.exercise.repetition.amount}</label>
                    <label>{props.exercise.weight.amount}</label>
                    <label>{props.exercise.distance.amount}</label>
                    <label>{props.exercise.duration.amount}</label>
                </div>
                <button
                    className="col-1 btn btn-outline-danger"
                    onClick={onDelete}
                >
                    delete
                </button>
            </div>
        )
    } else {
        return ('')
    }

    function onDelete(e) {
        e.preventDefault();

        props.onDelete(props.exercise);

    }
}

export default TrainingExerciseList;
