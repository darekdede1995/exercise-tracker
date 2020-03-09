/* eslint-disable react/prop-types */
import '../../styles/newExercisePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeExercise } from "../../redux/actions/exercisesAction"


function ExerciseList(props) {

	const [exercisesList, setExercisesList] = useState([]);
	const exercises = useSelector(state => state.exercises.exercises);
	const dispatch = useDispatch();

	useEffect(() => {
		if(exercises){
			setExercisesList(exercises.filter((exercise) => exercise.pattern === true));
		}
	}, [exercises])

	return (
		<div>
			{props.onUpdate}
			<h2 className="my-3">Exercise list:</h2>
			{exercisesList.map((exercise) => {
				return (
					<Exercise
						exercise={exercise}
						deleteExercise={deleteExercise}
						key={exercise._id}
					/>
				);
			})}
		</div>
	);

	function deleteExercise(exercise) {
		dispatch(removeExercise(exercise));
	}
}


function Exercise(props) {
		return (
			<div>
			<div className="d-lg-none mobile col-12 my-3 d-flex justify-content-between exercise-container">
				<label className="col-8 vertically-middle">{props.exercise.name}</label>
				<button
					className="col-3 btn btn-outline-danger"
					onClick={() => {
						props.deleteExercise(props.exercise);
					}}>
					-
				</button>
			</div>
			<div className="d-none d-lg-inline">
			<div className="col-12 my-3 d-flex justify-content-between exercise-container">
				<label className="col-8 vertically-middle">{props.exercise.name}</label>
				<button
					className="col-2 btn btn-outline-danger"
					onClick={() => {
						props.deleteExercise(props.exercise);
					}}>
					delete
				</button>
			</div>
			</div>
			
			</div>
		);
}

export default ExerciseList;
