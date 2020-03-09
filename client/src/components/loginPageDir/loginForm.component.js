import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/loginPage.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchUser } from "../../redux/actions/userAction";
import { fetchExercises } from "../../redux/actions/exercisesAction";
import { fetchTrainings } from "../../redux/actions/trainingsAction";
import { fetchGroups } from "../../redux/actions/groupsAction";
import { useDispatch, ReactReduxContext } from "react-redux";
import { setInStorage, getFromStorage } from "../../utils/storage";
import { Redirect } from "react-router-dom";

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [fieldsValid, setfieldsValid] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const localStorage = getFromStorage("exercise-tracker");
  const dispatch = useDispatch();

  useEffect(() => {
    verify();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fieldsValidation();
    // eslint-disable-next-line
  }, [username, password]);

  return (
    <div className="row justify-content-center">
      {(localStorage||redirect) ? <Redirect to="/new-exercise"/> : ''}
      <input
        className={
          "required-class form-control my-3 p-2 col-7 " +
          (usernameValid ? "" : "invalid-field")
        }
        autoFocus
        type="text"
        placeholder="username"
        value={username}
        onChange={onChangeUsername}
        onKeyDown={onEnterDown}
      ></input>
      <input
        className={
          "required-class form-control my-3 p-2 col-7 " +
          (passwordValid ? "" : "invalid-field")
        }
        type="password"
        placeholder="password"
        value={password}
        onChange={onChangePassword}
        onKeyDown={onEnterDown}
      ></input>
      <div className="w-100"></div>
      <button
        className="btn btn-outline-dark m-3 col-4"
        onClick={onLoginSubmit}
      >
        Login
      </button>
    </div>
  );

  function verify() {

    if (localStorage) {
      if (localStorage.userSession) {
        const userSession = localStorage.userSession;

        axios
          .post(
            process.env.REACT_APP_API_URL+'/api/users/verify?userSessionId=' +
              userSession._id
          )
          .then(res => {
            if (res.data.success) {
              setRedirect(true);
            } else {
              setRedirect(false);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }

  function onChangeUsername(e) {
    setUsername(e.target.value);
    if (!e.target.value) {
      setUsernameValid(false);
    } else {
      setUsernameValid(true);
    }
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
    if (!e.target.value) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
  }

  function onEnterDown(e) {
    if (e.keyCode === 13) {
      onLoginSubmit();
    }
  }

  function onLoginSubmit() {
    if (fieldsValid) {
      const user = {
        username: username,
        password: password
      };

      axios
        .post(process.env.REACT_APP_API_URL+'/api/users/login', user)
        .then(res => {
          setUsername("");
          setPassword("");

          if (res.data.success) {
            setInStorage("exercise-tracker", {
              userSession: res.data.userSession
            });
            fetchData(res.data.userSession.userid);
            setRedirect(true);
          }
        })
        .catch(error => {
          if (error.response) {
            alert(error.response.data);
          } else {
            console.log(error);
            alert(error);
          }
        });
    }
  }

  function fetchData(user) {
    dispatch(fetchUser(user));
    dispatch(fetchTrainings(user));
    dispatch(fetchExercises(user));
    dispatch(fetchGroups(user));
  }

  function fieldsValidation() {
    if (username && password) {
      setfieldsValid(true);
    } else {
      setfieldsValid(false);
    }
  }
}
export default LoginForm;
