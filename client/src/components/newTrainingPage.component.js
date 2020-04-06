import '../styles/newTrainingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import NavBar from './sidebar/sideBar.component';
import NewTrainingForm from './newTrainingPageDir/newTrainingForm.component';
import { addTraining, setTraining } from '../redux/actions/trainingsAction';
import { useSelector, useDispatch } from 'react-redux';

function TrainigPage() {
  const trainings = useSelector(state => state.trainings.trainings);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (trainings && user) {
      if (trainings.length === 0) {
        createNewTraining();
      } else {
        const nonFinished = trainings.find(tr => tr.finished === false);
        if (nonFinished) {
          dispatch(setTraining(nonFinished));
        } else {
          createNewTraining();
        }
      }
    }
    // eslint-disable-next-line
  }, [trainings, user]);

  return (
    <div>
      <div className="row d-lg-none">
        <div className="col-12">
          <NavBar />
        </div>
        <div className="col-12">
          <Title />
          <NewTrainingForm />
        </div>
      </div>
      <div className="row d-none d-lg-flex">
        <div className="col-3">
          <NavBar />
        </div>
        <div className="col-9">
          <Title />
          <NewTrainingForm />
        </div>
      </div>
    </div>
  );

  function createNewTraining() {
	let x = new Date();
	x.setMinutes(x.getMinutes - x.getTimezoneOffset());
    console.log(x);
    // console.log(x.getTimezoneOffset());
    if (user) {
      const newTraining = {
        userid: user._id,
        description: '',
        date: new Date(),
        exercises: []
      };
      dispatch(addTraining(newTraining));
    }
  }
}

function Title(props) {
  return <h3>New training:</h3>;
}

export default TrainigPage;
