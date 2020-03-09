/* eslint-disable react/prop-types */
import '../../styles/newTrainingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NewTrainingExercise from './newTrainingExercise.component'
import TrainingExerciseList from './newTrainingExerciseList.component';
import { removeTraining, updateTraining } from '../../redux/actions/trainingsAction';

function NewTrainingForm() {

	const [exerciseList, setExercisesList] = useState([]); //wszystkie dostepne exercisy
	const [trainingDate, setTrainingDate] = useState(new Date()); //dzisiejsza data
	const [useDifferentDate, setUseDifferentDate] = useState(false); //uzyj innej daty
	const [differentDate, setDifferentDate] = useState(false); //inna data

	const [trainingDescription, setTrainingDescription] = useState('');

	const [newExercise, setNewExercise] = useState(false);	//czy dodajemy nowe cwiczenie
	const [currentExercise, setCurrentExercise] = useState('');	//obecnie dodawane cwiczenie

	const exercises = useSelector(state => state.exercises.exercises);
	const currentTraining = useSelector(state => state.trainings.currentTraining);
	const dispatch = useDispatch();

	useEffect(() => {
		if (exercises) {
			setExercisesList(exercises);
		}
	}, [exercises])

	return (
		<div >
		<form className="d-lg-none mobile">
			<div className="row">
				<div className="col-3 p-0">
					<label className="vertically-middle m-3 col-12 p-0">training date: </label>
					<label className="vertically-middle m-3 col-12 p-0">description: </label>
				</div>
				<div className="col-9 p-0">
					<div className="row date">
						<span hidden={useDifferentDate} className="col-7 m-2 mt-3">{trainingDate.toDateString()}</span>
						<input
							hidden={!useDifferentDate}
							className="form-control col-6 mx-3 my-2"
							type="date"
							value={differentDate}
							onChange={onDifferentDateChange}
						/>
						<button className="btn btn-outline-dark my-2 p-1 col-3" onClick={onUseDifferentDataChange}>
							{useDifferentDate ? 'today' : 'edit'}
						</button>
					</div>
					<textarea className="form-control col-7 m-4 my-2" type="text" value={trainingDescription} onChange={onTrainingDescriptionChange} />
				</div>
				<div className="col-12 text-center">
					<button onClick={saveTraining} className="col-5 btn btn-outline-success p-3 m-2">finish and save</button>
					<button onClick={discardTraining} className="col-5 btn btn-outline-danger p-3 mx-2">discard training</button>
				</div>
			</div>
			<TrainingExerciseList />
			<div className="row">
				<div className="col-4">
					<button className="btn btn-outline-success m-3 mt-2" onClick={onNewExerciseChange}>
						add exercise
						</button>
				</div>
				{AvailableExerciseList()}
			</div>
			{currentExercise ? <NewTrainingExercise exercise={currentExercise} onSubmitExercise={clearExerciseFields} /> : ''}
		</form>
		<form className="d-none d-lg-inline">
			<div className="row">
				<div className="col-2">
					<label className="vertically-middle m-3">training date: </label>
					<label className="vertically-middle m-3">description: </label>
				</div>
				<div className="col-6">
					<div className="row date">
						<span hidden={useDifferentDate} className="col-4 m-2 mt-3">{trainingDate.toDateString()}</span>
						<input
							hidden={!useDifferentDate}
							className="form-control col-4 mx-3 my-2"
							type="date"
							value={differentDate}
							onChange={onDifferentDateChange}
						/>
						<button className="btn btn-outline-dark p-1 m-2" onClick={onUseDifferentDataChange}>
							{useDifferentDate ? 'today' : 'edit'}
						</button>
					</div>
					<textarea className="form-control col-8 my-2" type="text" value={trainingDescription} onChange={onTrainingDescriptionChange} />
				</div>
				<div className="col-4">
					<button onClick={saveTraining} className="col-6 btn btn-outline-success p-3 m-3">finish and save</button>
					<button onClick={discardTraining} className="col-6 btn btn-outline-danger p-3 mx-3">discard</button>
				</div>
			</div>
			<TrainingExerciseList />
			<div className="row">
				<div className="col-2">
					<button className="btn btn-outline-success m-3 mt-5" onClick={onNewExerciseChange}>
						add exercise
						</button>
				</div>
				{AvailableExerciseList()}
			</div>
			{currentExercise ? <NewTrainingExercise exercise={currentExercise} onSubmitExercise={clearExerciseFields} /> : ''}
		</form>
		</div>
	);

	function saveTraining(e) {
		e.preventDefault();

		const updatedTraining = currentTraining;
		updatedTraining.finished = true;
		updatedTraining.description = trainingDescription;
		if (differentDate && useDifferentDate) {
			updatedTraining.date = differentDate;
		} else {
			updatedTraining.date = trainingDate;
		}

		dispatch(updateTraining(updatedTraining));
		clearTrainingFields();
	}

	function discardTraining(e) {
		e.preventDefault();

		dispatch(removeTraining(currentTraining));
		clearTrainingFields();
	}

	function clearTrainingFields() {
		setTrainingDescription('');
		setTrainingDate(new Date());
		setUseDifferentDate(false);
		setNewExercise(false);
		setCurrentExercise('');
		setDifferentDate('');
	}

	function AvailableExerciseList() {
		if (newExercise) {
			return (<select
				onChange={onChangeCurrentExercise}
				className="form-control col-6 col-lg-3 m-3 mt-2 mt-lg-5"
			>
				<option defaultValue />
				{exerciseList.filter((exercise) => exercise.pattern === true).map((exercise) => {
					return <option value={exercise._id} key={exercise._id}>{exercise.name}</option>
				})}
			</select>)
		} else {
			return '';
		}
	}

	function onChangeCurrentExercise(e) {

		const sel = exerciseList.find((exercise) => exercise._id === e.target.value);
		if(sel){
			setCurrentExercise(sel);
		}else{
			setCurrentExercise('');
		}
	}


	function onTrainingDescriptionChange(e) {
		setTrainingDescription(e.target.value);
	}

	function onDifferentDateChange(e) {
		setDifferentDate(e.target.value);
	}

	function onUseDifferentDataChange(e) {
		e.preventDefault();
		setUseDifferentDate(!useDifferentDate);
	}


	function clearExerciseFields() {
		setNewExercise(false);
		setCurrentExercise('');
	}

	function onNewExerciseChange(e) {
		e.preventDefault();
		setNewExercise(true);
	}
}

export default NewTrainingForm;
