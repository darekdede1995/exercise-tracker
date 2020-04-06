import '../../styles/trainingHistoryPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeExercise } from '../../redux/actions/exercisesAction';
import { removeTraining } from '../../redux/actions/trainingsAction';

function HistoryList(props) {
  const [trainingsList, setTrainingsList] = useState([]);
  const trainings = useSelector(state => state.trainings.trainings);

  useEffect(() => {
    if (trainings) {
      setTrainingsList(
        trainings.filter(training => training.finished === true)
      );
    }
  }, [trainings]);

  const sortedTrainingsList = trainingsList.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div>
      <h2 className="my-3 mb-5">Training history:</h2>
      {sortedTrainingsList.map(training => (
        <Training key={training._id} training={training} />
      ))}
    </div>
  );
}

function Training(props) {
  const [toggle, revertToggle] = useState(false);
  const dispatch = useDispatch();

  function toggleChange() {
    revertToggle(!toggle);
  }

  const date = new Date(props.training.date);

  return (
    <div>
      <div className="d-none d-lg-block col-12 my-3 pb-3 training-container training-list-header ">
        <div className="row">
          <div className="col-3 vertically-middle">
            <label className="px-5">date: </label>
            <label className="px-5">description: </label>
          </div>
          <div className="col-5 vertically-middle">
            <label>
              {date.toDateString()} - {('0' + date.getHours()).slice(-2)}:
              {('0' + date.getMinutes()).slice(-2)}
            </label>
            <br></br>
            <label>{props.training.description}</label>
          </div>
          <button
            onClick={toggleChange}
            className="btn btn-outline-dark p-3 m-2"
          >
            {toggle ? 'fold' : 'expand'}
          </button>
          <button
            onClick={deleteTraining}
            className="btn btn-outline-danger p-3 m-2"
          >
            delete
          </button>
        </div>
        <div hidden={!toggle} className="py-5">
          <Exercises training={props.training} />
        </div>
      </div>
      <div className="d-lg-none col-12 my-2 pb-3 training-container training-list-header mobile">
        <div className="row">
          <div className="col-4 p-0 vertically-middle">
            <label className="col-12 p-0">date: </label>
            <label className="col-12 p-0">description: </label>
          </div>
          <div className="col-8 p-0 vertically-middle">
            <label>
              {date.toDateString()} - {('0' + date.getUTCHours()).slice(-2)}:
              {('0' + date.getUTCMinutes()).slice(-2)}
            </label>
            <br></br>
            <label>{props.training.description}</label>
          </div>
          <div className="col-12 text-center">
            <button
              onClick={toggleChange}
              className="btn btn-outline-dark col-4 p-1  m-2 btn-mobile"
            >
              {toggle ? '↑' : '↓'}
            </button>
            <button
              onClick={deleteTraining}
              className="btn btn-outline-danger col-4 p-1 m-2 btn-mobile"
            >
              -
            </button>
          </div>
        </div>
        <div hidden={!toggle} className="py-2">
          <Exercises training={props.training} />
        </div>
      </div>
    </div>
  );

  function deleteTraining(e) {
    if (confirm('Are you sure you want to delete this training?')) {
      e.preventDefault();
      dispatch(removeTraining(props.training));
    }
  }
}

function Exercises(props) {
  const [exercisesList, setExercisesList] = useState([]);
  const exercises = useSelector(state => state.exercises.exercises);
  const dispatch = useDispatch();

  useEffect(() => {
    if (exercises) {
      setExercisesList(
        exercises.filter(exercise =>
          props.training.exercises.includes(exercise._id)
        )
      );
    }
    // eslint-disable-next-line
  }, [exercises]);

  return (
    <div>
      <div className="d-lg-none mobile">
        {exercisesList.map(exercise => {
          return (
            <div key={exercise._id} className="exercise-row">
              <div className="col-12 px-0 mt-1 pb-2 d-flex justify-content-between exercise-container exercise-list-header">
                <label className="col-4 p-0 vertically-middle">name</label>
                <label
                  hidden={exercise.description === ''}
                  className="col-5 p-0 vertically-middle"
                >
                  description
                </label>
                <label
                  hidden={exercise.group.posses === false}
                  className="col-3 p-0 vertically-middle"
                >
                  group
                </label>
              </div>
              <div className="col-12 px-0 mt-1 pb-2 d-flex justify-content-between">
                <label className="col-4 p-0 vertically-middle">
                  {exercise.name}
                </label>
                <label
                  hidden={exercise.description === ''}
                  className="col-5 p-0 vertically-middle"
                >
                  {exercise.description}
                </label>
                <label
                  hidden={exercise.group.posses === false}
                  className="col-3 p-0 vertically-middle"
                >
                  {exercise.group.name}
                </label>
              </div>

              <div className="col-12 px-0 mt-1 pb-2 d-flex justify-content-around exercise-container exercise-list-header">
                <label
                  hidden={exercise.repetition.posses === false}
                  className="p-0 vertically-middle "
                >
                  repetition
                </label>
                <label
                  hidden={exercise.weight.posses === false}
                  className="p-0 vertically-middle "
                >
                  weight
                </label>
                <label
                  hidden={exercise.distance.posses === false}
                  className="p-0 vertically-middle "
                >
                  distance
                </label>
                <label
                  hidden={exercise.duration.posses === false}
                  className="p-0 vertically-middle "
                >
                  duration
                </label>
              </div>
              <div className="col-12 px-0 mt-1 pb-4 d-flex justify-content-around">
                <label
                  hidden={exercise.repetition.posses === false}
                  className="p-0 vertically-middle "
                >
                  {exercise.repetition.amount}
                </label>
                <label
                  hidden={exercise.weight.posses === false}
                  className="p-0 vertically-middle "
                >
                  {exercise.weight.amount}
                </label>
                <label
                  hidden={exercise.distance.posses === false}
                  className="p-0 vertically-middle "
                >
                  {exercise.distance.amount}
                </label>
                <label
                  hidden={exercise.duration.posses === false}
                  className="p-0 vertically-middle "
                >
                  {exercise.duration.amount}
                </label>
              </div>
            </div>
          );
        })}
      </div>
      <div className="d-none d-lg-inline">
        <div className="col-12 mt-3 pb-3 d-flex justify-content-between exercise-container exercise-list-header">
          <label className="col-3 vertically-middle">name</label>
          <label className="col-2 vertically-middle">description</label>
          <label className="col-2 vertically-middle">group</label>
          <div className="col-5 d-flex justify-content-around">
            <label className="vertically-middle twenty">repetition</label>
            <label className="vertically-middle twenty">weight</label>
            <label className="vertically-middle twenty">distance</label>
            <label className="vertically-middle twenty">duration</label>
          </div>
        </div>
        {exercisesList.map(exercise => {
          return (
            <Exercise
              exercise={exercise}
              deleteExercise={deleteExercise}
              key={exercise._id}
            />
          );
        })}{' '}
      </div>
    </div>
  );

  function deleteExercise(exercise) {
    dispatch(removeExercise(exercise));
  }
}

function Exercise(props) {
  return (
    <div className="col-12 py-3 d-flex justify-content-between exercise-container exercise-row">
      <label className="col-3 vertically-middle">{props.exercise.name}</label>
      <label className="col-2 vertically-middle">
        {props.exercise.description}
      </label>
      <label className="col-2 vertically-middle">
        {props.exercise.group.name}
      </label>
      <div className="col-5 d-flex justify-content-around">
        <label>{props.exercise.repetition.amount}</label>
        <label>{props.exercise.weight.amount}</label>
        <label>{props.exercise.distance.amount}</label>
        <label>{props.exercise.duration.amount}</label>
      </div>
    </div>
  );
}

export default HistoryList;
