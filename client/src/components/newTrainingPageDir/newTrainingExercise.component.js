/* eslint-disable react/prop-types */
import '../../styles/newTrainingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addExercise } from "../../redux/actions/exercisesAction"

function NewTrainingExercise(props) {

    const [exerciseRepetition, setExerciseRepetition] = useState('');
    const [exerciseWeight, setExerciseWeight] = useState('');
    const [exerciseDistance, setExerciseDistance] = useState('');
    const [exerciseDuration, setExerciseDuration] = useState('');
    const [exercise, setExercise] = useState(props.exercise);
    const dispatch = useDispatch();

    useEffect(() => {
        setExercise(props.exercise);
    }, [props.exercise]);

    return (
        <div>
            <div className="new-exercise-container d-lg-none row mobile">
                <div className="col-12 my-1 pb-2 d-flex justify-content-between exercise-container exercise-list-header">
                    <label className="col-4 p-0 vertically-middle">name</label>
                    <label className="col-4 p-0 vertically-middle" hidden={exercise.description === ''}>description</label>
                    <label className="col-4 p-0 vertically-middle" hidden={!exercise.group.posses}>group</label>
                </div>
                <div className="col-12 my-1 pb-3 d-flex justify-content-between">
                    <label className="col-4 p-0 vertically-middle">{exercise.name}</label>
                    <label className="col-4 p-0 vertically-middle">{exercise.description}</label>
                    <label className="col-4 p-0 vertically-middle">{exercise.group.name}</label>
                </div>
                <div className="col-12 my-1 pb-2 exercise-container exercise-list-header">
                    <label className="vertically-middle col-3 p-1">repetition</label>
                    <label className="vertically-middle col-3 p-1">weight</label>
                    <label className="vertically-middle col-3 p-1">distance</label>
                    <label className="vertically-middle col-3 p-1">duration</label>
                </div>
                <div className="col-12 my-1 pb-3 d-flex justify-content-between">
                    <div className="col-3 p-1">
                        <input className="form-control" type="text" hidden={!exercise.repetition.posses} value={exerciseRepetition} onChange={onRepetitionChange} />
                    </div>
                    <div className="col-3 p-1">
                        <input className="form-control" type="text" hidden={!exercise.weight.posses} value={exerciseWeight} onChange={onWeightChange} />
                    </div>
                    <div className="col-3 p-1">
                        <input className="form-control" type="text" hidden={!exercise.distance.posses} value={exerciseDistance} onChange={onDistanceChange} />
                    </div>
                    <div className="col-3 p-1">
                        <input className="form-control" type="text" hidden={!exercise.duration.posses} value={exerciseDuration} onChange={onDurationChange} />
                    </div>
                </div>
                <div className="col-12 my-3 text-center">
                    <button
                        onClick={onExerciseClear}
                        className="col-5 btn btn-outline-danger m-2 p-1"
                    >
                        clear
					</button>
                    <button
                        onClick={onExerciseSave}
                        className="col-5 btn btn-outline-success m-2 p-1"
                    >
                        save
					</button>
                </div>
            </div>
            <div className="new-exercise-container d-none d-lg-inline">
                <div className="col-12 my-3 row">
                    <div className="col-2">
                        <label className="col-12 my-3 vertically-middle">name</label>
                        <label className="col-12 vertically-middle">{exercise.name}</label>
                    </div>
                    <div className="col-2" hidden={exercise.description === ''}>
                        <label className="col-12 my-3 vertically-middle">description</label>
                        <label className="col-12 vertically-middle">{exercise.description}</label>
                    </div>
                    <div className="col-1" hidden={!exercise.group.posses}>
                        <label className="col-12 my-3 vertically-middle">group</label>
                        <label className="col-12 vertically-middle">{exercise.group.name}</label>
                    </div>
                    <div className="mx-3 text-center" hidden={!exercise.repetition.posses}>
                        <label className="my-3 vertically-middle">repetition</label>
                        <input className="form-control p-3" type="text" value={exerciseRepetition} onChange={onRepetitionChange} />
                    </div>
                    <div className="mx-3 text-center" hidden={!exercise.weight.posses}>
                        <label className=" my-3 vertically-middle">weight</label>
                        <input className="form-control p-3" type="text" value={exerciseWeight} onChange={onWeightChange} />
                    </div>
                    <div className="mx-3 text-center" hidden={!exercise.distance.posses}>
                        <label className=" my-3 vertically-middle">distance</label>
                        <input className="form-control p-3" type="text" value={exerciseDistance} onChange={onDistanceChange} />
                    </div>
                    <div className="mx-3 text-center" hidden={!exercise.duration.posses}>
                        <label className=" my-3 vertically-middle">duration</label>
                        <input className="form-control p-3" type="text" value={exerciseDuration} onChange={onDurationChange} />
                    </div>
                    <button
                        onClick={onExerciseClear}
                        className="btn btn-outline-danger mx-1  p-1 align-self-end"
                    >
                        clear
					</button>
                    <button
                        onClick={onExerciseSave}
                        className="btn btn-outline-success mx-1 p-1 align-self-end"
                    >
                        save
					</button>
                </div>
            </div>
        </div>

    );

    function onDurationChange(e) {
        setExerciseDuration(e.target.value);
    }

    function onRepetitionChange(e) {
        setExerciseRepetition(e.target.value);
    }

    function onWeightChange(e) {
        setExerciseWeight(e.target.value);
    }

    function onDistanceChange(e) {
        setExerciseDistance(e.target.value);
    }

    function onExerciseSave(e) {
        e.preventDefault();

        const exerciseToSave = JSON.parse(JSON.stringify(exercise));;

        if (exerciseDistance !== '')
            exerciseToSave.distance.amount = exerciseDistance;
        if (exerciseWeight !== '') exerciseToSave.weight.amount = exerciseWeight;
        if (exerciseDuration !== '')
            exerciseToSave.duration.amount = exerciseDuration;
        if (exerciseRepetition !== '')
            exerciseToSave.repetition.amount = exerciseRepetition;
        exerciseToSave.pattern = false;

        dispatch(addExercise(exerciseToSave));
        onExerciseClear(e);
        props.onSubmitExercise();
    }

    function onExerciseClear(e) {
        e.preventDefault();

        setExerciseDistance('');
        setExerciseDuration('');
        setExerciseRepetition('');
        setExerciseWeight('');
    }
}



export default NewTrainingExercise