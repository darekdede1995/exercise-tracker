import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/sideBar.css';
import React, { useState, useEffect } from 'react';
import default_avatar from '../../resources/images/default_avatar.png';
import hamburger from '../../resources/images/hamburger.png';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import { getFromStorage, clearStorage } from '../../utils/storage';
import { fetchUser, dropUser } from '../../redux/actions/userAction';
import {
  fetchExercises,
  dropExercises
} from '../../redux/actions/exercisesAction';
import {
  fetchTrainings,
  dropTrainings
} from '../../redux/actions/trainingsAction';
import { fetchGroups, dropGroups } from '../../redux/actions/groupsAction';
import { useDispatch, useSelector } from 'react-redux';

function NavBar() {
  // const [redirect, setRedirect] = useState(false);
  const [menu, toggleMenu] = useState(false);
  const localStorage = getFromStorage('exercise-tracker');
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!user) {
  //     verify();
  //   }
  //   // eslint-disable-next-line
  // }, [user])

  useEffect(() => {
    if (!user) {
      loadDataToStore(localStorage.userSession.userid);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="d-lg-none mb-3 mobile">
        {localStorage ? '' : <Redirect to="/" />}
        <img
          onClick={onToggleMenu}
          src={hamburger}
          alt=""
          className="col-2"
        ></img>
        <div hidden={!menu}>
          <Link
            className={
              window.location.pathname === '/training'
                ? 'nav-link selected-link'
                : 'nav-link'
            }
            to="/training"
          >
            <h3>training</h3>
          </Link>
          <Link
            className={
              window.location.pathname === '/history'
                ? 'nav-link selected-link'
                : 'nav-link'
            }
            to="/history"
          >
            <h3>history</h3>
          </Link>
          <Link
            className={
              window.location.pathname === '/exercises-list'
                ? 'nav-link selected-link'
                : 'nav-link'
            }
            to="/exercises-list"
          >
            <h3>exercises list</h3>
          </Link>
          <Link
            className={
              window.location.pathname === '/new-exercise'
                ? 'nav-link selected-link'
                : 'nav-link'
            }
            to="/new-exercise"
          >
            <h3>new exercise</h3>
          </Link>
          <div onClick={logout} className="nav-link">
            <h3>logout</h3>
          </div>
        </div>
      </div>
      <div className="mt-3 d-none d-lg-inline">
        {localStorage ? '' : <Redirect to="/" />}
        <img
          src={default_avatar}
          alt=""
          className="ml-5 d-none d-md-inline"
        ></img>
        <Link
          className={
            window.location.pathname === '/training'
              ? 'nav-link selected-link'
              : 'nav-link'
          }
          to="/training"
        >
          <h3>training</h3>
        </Link>
        <Link
          className={
            window.location.pathname === '/history'
              ? 'nav-link selected-link'
              : 'nav-link'
          }
          to="/history"
        >
          <h3>history</h3>
        </Link>
        <Link
          className={
            window.location.pathname === '/exercises-list'
              ? 'nav-link selected-link'
              : 'nav-link'
          }
          to="/exercises-list"
        >
          <h3>exercises list</h3>
        </Link>
        <Link
          className={
            window.location.pathname === '/new-exercise'
              ? 'nav-link selected-link'
              : 'nav-link'
          }
          to="/new-exercise"
        >
          <h3>new exercise</h3>
        </Link>
        <div onClick={logout} className="nav-link">
          <h3>logout</h3>
        </div>
      </div>
    </div>
  );

  function onToggleMenu() {
    toggleMenu(!menu);
  }

  function loadDataToStore(userid) {
    dispatch(fetchUser(userid));
    dispatch(fetchExercises(userid));
    dispatch(fetchGroups(userid));
    dispatch(fetchTrainings(userid));
  }

  // function verify() {

  //   if (localStorage) {
  //     if (localStorage.userSession) {
  //       const userSession = localStorage.userSession;

  //       axios
  //         .post(process.env.REACT_APP_API_URL+'/api/users/verify?userSessionId=' + userSession._id)
  //         .then(res => {
  //           if (res.data.success) {
  //             loadDataToStore(userSession.userid);
  //             setRedirect(false);
  //             return;
  //           } else {
  //             setRedirect(true);
  //             return;
  //           }
  //         })
  //         .catch(error => {
  //           console.log(error);
  //         });
  //     } else {
  //       setRedirect(true);
  //     }
  //   }
  // }

  function logout() {
    clearStorage('exercise-tracker');
    if (localStorage) {
      if (localStorage.userSession) {
        const userSession = localStorage.userSession;

        axios
          .delete(
            process.env.REACT_APP_API_URL +
              '/api/users/logout/' +
              userSession._id
          )
          .then(res => {
            if (res.data.success) {
              dispatch(dropUser());
              dispatch(dropExercises());
              dispatch(dropTrainings());
              dispatch(dropGroups());

              // setRedirect(true);
            } else {
              // setRedirect(false);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
}

export default NavBar;
