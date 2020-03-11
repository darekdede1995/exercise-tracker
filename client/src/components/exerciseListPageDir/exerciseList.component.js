import "bootstrap/dist/css/bootstrap.min.css";
import '../../styles/exerciseListPage.css';
import React, { useEffect, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { useSelector, useDispatch } from 'react-redux';
import { removeExercise } from "../../redux/actions/exercisesAction"


function ExerciseList() {

  const [exercisesList, setExercisesList] = useState([]);
  const exercises = useSelector(state => state.exercises.exercises);
  const dispatch = useDispatch();

  useEffect(() => {
    if (exercises) {
      setExercisesList(exercises.filter((exercise) => exercise.pattern === true));
    }
  }, [exercises])


  return (
    <div>
      <div className="d-lg-none mobile">
        <h2 className="my-3">Exercises list:</h2>

        {exercisesList.map(exercise => {
          return (
            <div key={exercise._id} className="exercise-row">
              <div className="col-12 my-3 pb-3 d-flex justify-content-between exercise-container exercise-list-header">
                <label className="col-4 p-0 vertically-middle">name</label>
                <label className="col-5 p-0 vertically-middle">description</label>
                <label className="col-3 p-0 vertically-middle">group</label>
              </div>
              <div className="col-12 my-3 pb-3 d-flex justify-content-between">
                <label className="col-4 p-0 vertically-middle">{exercise.name}</label>
                <label className="col-5 p-0 vertically-middle">{exercise.description}</label>
                <label className="col-3 p-0 vertically-middle">{exercise.group.name}</label>
              </div>
              <div className="col-12 my-1 pb-3  exercise-container exercise-list-header text-center">
                <label className="col-3 p-0 vertically-middle">repetition</label>
                <label className="col-3 p-0 vertically-middle">weight</label>
                <label className="col-3 p-0 vertically-middle">distance</label>
                <label className="col-3 p-0 vertically-middle">duration</label>
              </div>
              <div className="col-12 pb-3 ">
                <Checkbox
                  className="col-3 p-0"
                  checked={exercise.repetition.posses}
                  color="default"
                  disabled={true}
                /><Checkbox
                  className="col-3 p-0"
                  checked={exercise.weight.posses}
                  color="default"
                  disabled={true}
                /><Checkbox
                  className="col-3 p-0"
                  checked={exercise.distance.posses}
                  color="default"
                  disabled={true}
                /><Checkbox
                  className="col-3 p-0"
                  checked={exercise.duration.posses}
                  color="default"
                  disabled={true}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="d-none d-lg-inline">
        <h2 className="my-3">Exercises list:</h2>
        <div className="col-12 my-3 pb-3 d-flex justify-content-between exercise-container exercise-list-header">
          <label className="col-3 vertically-middle">name</label>
          <label className="col-2 vertically-middle">description</label>
          <label className="col-1 vertically-middle">group</label>
          <div className="col-5 d-flex justify-content-around">
            <label className="vertically-middle twenty">repetition</label>
            <label className="vertically-middle twenty">weight</label>
            <label className="vertically-middle twenty">distance</label>
            <label className="vertically-middle twenty">duration</label>
          </div>
          <div className="col-1"></div>
        </div>
        {exercisesList.map(exercise => {
          return (
            <Exercise
              exercise={exercise}
              deleteExercise={deleteExercise}
              key={exercise._id}
            />
          );
        })}
      </div>
    </div>
  );

  function deleteExercise(exercise) {
    dispatch(removeExercise(exercise));
  }
}

function Exercise(props) {

  return (
    <div className="col-12 py-3 d-flex justify-content-between exercise-container exercise-row" >
      <label className="col-3 vertically-middle">
        {props.exercise.name}
      </label>
      <label className="col-2 vertically-middle">
        {props.exercise.description}
      </label>
      <label className="col-1 vertically-middle">
        {props.exercise.group.name}
      </label>
      <div className="col-5 d-flex justify-content-around">
        <Checkbox
          checked={props.exercise.repetition.posses}
          color="default"
          disabled={true}
        />
        <Checkbox
          checked={props.exercise.weight.posses}
          color="default"
          disabled={true}
        />
        <Checkbox
          checked={props.exercise.distance.posses}
          color="default"
          disabled={true}
        />
        <Checkbox
          checked={props.exercise.duration.posses}
          color="default"
          disabled={true}
        />
      </div>
      <button
        className="col-1 btn btn-outline-danger"
        onClick={() => {
          props.deleteExercise(props.exercise);
        }}
      >
        delete
          </button>
    </div>
  );

}

export default ExerciseList;
