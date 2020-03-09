/* eslint-disable react/prop-types */
import '../../styles/newExercisePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import GroupList from './groupList.component';
import Checkbox from '@material-ui/core/Checkbox';
import { addExercise } from "../../redux/actions/exercisesAction"
import { useDispatch, useSelector } from 'react-redux';

function NewExerciseForm() {

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [nameValid, setNameValid] = useState(true);
	const [groupPosses, setGroupPosses] = useState(false);
	const [groupName, setGroupName] = useState('');
	const [repetitionPosses, setRepetitionPosses] = useState(false);
	const [weightPosses, setWeightPosses] = useState(false);
	const [distancePosses, setDistancePosses] = useState(false);
	const [durationPosses, setDutarionPosses] = useState(false);
	const user = useSelector(state => state.user.user);
	const dispatch = useDispatch();

	return (
		<div>
		<form className="d-lg-none mobile" onSubmit={onSubmit}>
			<div className="form-group">
				<div>
					<input
						className={
							'required-class form-control my-3 p-3 col-12 ' +
							(nameValid ? '' : 'invalid-field')
						}
						type="text"
						name="name"
						placeholder="name"
						value={name}
						onChange={onChangeName}
					/>
				</div>
				<div>
					<input
						className="col-12 form-control my-3 p-3"
						type="text"
						name="description"
						placeholder="description"
						value={description}
						onChange={onChangeDescription}
					/>
				</div>
				<fieldset className="form-group mx-2 px-3">
					<div className="form-check p-0 row">
						<Checkbox
							checked={groupPosses}
							onChange={onChangeGroupPosses}
							color="default"
						/>
						<label className="form-check-label"> belong to group </label>
						<div className="ml-3" hidden={!groupPosses}>
							<GroupList
								onChangeGroupName={onChangeGroupName}
								groupValue={groupName}
							/>
						</div>
					</div>
					<div className="form-check p-0 row">
						<Checkbox
							checked={repetitionPosses}
							onChange={onChangeRepetitionPosses}
							color="default"
						/>
						<label className="form-check-label"> repetition </label>
					</div>
					<div className="form-check p-0 row">
						<Checkbox
							checked={weightPosses}
							onChange={onChangeWeightPosses}
							color="default"
						/>
						<label className="form-check-label"> weight </label>
					</div>
					<div className="form-check p-0 row">
						<Checkbox
							checked={distancePosses}
							onChange={onChangeDistancePosses}
							color="default"
						/>
						<label className="form-check-label"> distance </label>
					</div>
					<div className="form-check p-0 row">
						<Checkbox
							checked={durationPosses}
							onChange={onChangeDurationPosses}
							color="default"
						/>
						<label className="form-check-label"> duration </label>
					</div>
				</fieldset>
				<button className="float-right btn btn-outline-dark my-3 p-3" type="submit">
					add new exercise
					</button>
			</div>
		</form>
		<form className="d-none d-lg-inline" onSubmit={onSubmit}>
			<div className="form-group">
				<div>
					<input
						className={
							'required-class form-control my-3 p-3 col-10 ' +
							(nameValid ? '' : 'invalid-field')
						}
						type="text"
						name="name"
						placeholder="name"
						value={name}
						onChange={onChangeName}
					/>
				</div>
				<div>
					<input
						className="col-10 form-control my-3 p-3"
						type="text"
						name="description"
						placeholder="description"
						value={description}
						onChange={onChangeDescription}
					/>
				</div>
				<fieldset className="form-group mx-2 px-3">
					<div className="form-check p-0 row">
						<Checkbox
							checked={groupPosses}
							onChange={onChangeGroupPosses}
							color="default"
						/>
						<label className="form-check-label"> belong to group </label>
						<div className="ml-3" hidden={!groupPosses}>
							<GroupList
								onChangeGroupName={onChangeGroupName}
								groupValue={groupName}
							/>
						</div>
					</div>
					<div className="form-check p-0 row">
						<Checkbox
							checked={repetitionPosses}
							onChange={onChangeRepetitionPosses}
							color="default"
						/>
						<label className="form-check-label"> repetition </label>
					</div>
					<div className="form-check p-0 row">
						<Checkbox
							checked={weightPosses}
							onChange={onChangeWeightPosses}
							color="default"
						/>
						<label className="form-check-label"> weight </label>
					</div>
					<div className="form-check p-0 row">
						<Checkbox
							checked={distancePosses}
							onChange={onChangeDistancePosses}
							color="default"
						/>
						<label className="form-check-label"> distance </label>
					</div>
					<div className="form-check p-0 row">
						<Checkbox
							checked={durationPosses}
							onChange={onChangeDurationPosses}
							color="default"
						/>
						<label className="form-check-label"> duration </label>
					</div>
				</fieldset>
				<button className="float-right btn btn-outline-dark my-3 p-3" type="submit">
					add new exercise
					</button>
			</div>
		</form>
		</div>
	);


	function onChangeName(e) {
		setName(e.target.value)

		if (e.target.value.length !== 0) {
			setNameValid(true);
		} else {
			setNameValid(false);
		}
	}

	function onChangeDescription(e) {
		setDescription(e.target.value);
	}

	function onChangeGroupPosses() {
		setGroupPosses(!groupPosses);
		setGroupName('');
	}

	function onChangeGroupName(e) {
		setGroupName(e.target.value);
	}

	function onChangeRepetitionPosses() {
		setRepetitionPosses(!repetitionPosses);
	}

	function onChangeWeightPosses() {
		setWeightPosses(!weightPosses);
	}

	function onChangeDistancePosses() {
		setDistancePosses(!distancePosses);
	}

	function onChangeDurationPosses() {
		setDutarionPosses(!durationPosses);
	}

	function onSubmit(e) {
		const myEvent = e;
		myEvent.preventDefault();

		if (name === '') {
			setNameValid(false);
		} else {
			const exercise = {
				pattern: true,
				userid: user._id,
				name: name,
				description: description,
				group: {
					posses: groupPosses,
					name: groupName
				},
				repetition: {
					posses: repetitionPosses
				},
				weight: {
					posses: weightPosses
				},
				distance: {
					posses: distancePosses
				},
				duration: {
					posses: durationPosses
				}
			};
			dispatch(addExercise(exercise));
			clearFields()
		}
	}

	function clearFields() {
		setName('');
		setDescription('');
		setGroupPosses(false);
		setGroupName('');
		setRepetitionPosses(false);
		setWeightPosses(false);
		setDistancePosses(false);
		setDutarionPosses(false);
	}
}

export default NewExerciseForm;
