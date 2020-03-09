import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/loginPage.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function RegisterForm(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [fieldsValid, setFieldsValid] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [repeatPasswordValid, setRepeatPasswordValid] = useState(true);
  const [emailMessage, setEmailMessage] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [repeatPasswordMessage, setRepeatPasswordMessage] = useState("");

  useEffect(() => {
    fieldsValidation();
    // eslint-disable-next-line
  }, [email, username, password, repeatPassword]);

  return (
    <div className="row justify-content-center text-center">
      <input
        className={
          "required-class form-control mb-1 mt-3 p-2 col-7 " +
          (emailValid ? "" : "invalid-field")
        }
        placeholder="email"
        value={email}
        onChange={onChangeEmail}
        onKeyDown={onEnterDown}
      ></input>{" "}
      <label hidden={emailValid} className="error-message col-12">
        {" "}
        {emailMessage}{" "}
      </label>{" "}
      <input
        className={
          "required-class form-control mb-1 mt-3 p-2 col-7 " +
          (usernameValid ? "" : "invalid-field")
        }
        type="text"
        placeholder="username"
        value={username}
        onChange={onChangeUsername}
        onKeyDown={onEnterDown}
      ></input>{" "}
      <label hidden={usernameValid} className="error-message col-12">
        {" "}
        {usernameMessage}{" "}
      </label>
      <input
        className={
          "required-class form-control mb-1 mt-3 p-2 col-7 " +
          (passwordValid ? "" : "invalid-field")
        }
        type="password"
        placeholder="password"
        value={password}
        onChange={onChangePassword}
        onKeyDown={onEnterDown}
      ></input>{" "}
      <label hidden={passwordValid} className="error-message col-12">
        {" "}
        {passwordMessage}{" "}
      </label>
      <input
        className={
          "required-class form-control mb-1 mt-3 p-2 col-7 " +
          (repeatPasswordValid ? "" : "invalid-field")
        }
        type="password"
        placeholder="repeat password"
        value={repeatPassword}
        onChange={onChangeRepeatPassword}
        onKeyDown={onEnterDown}
      ></input>{" "}
      <label hidden={repeatPasswordValid} className="error-message col-12">
        {repeatPasswordMessage}{" "}
      </label>{" "}
      <div className="w-100"> </div>
      <button
        className="btn btn-outline-dark m-3 col-4"
        type="submit"
        onClick={onRegisterSubmit}
      >
        Register{" "}
      </button>{" "}
    </div>
  );

  function onEnterDown(e) {
    if (e.keyCode === 13) {
      fieldsValidation();
    }
  }

  function onChangeUsername(e) {
    setUsername(e.target.value);
    usernameValidate(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
    passwordValidate(e.target.value);
  }

  function onChangeEmail(e) {
    setEmail(e.target.value.toLowerCase());
    emailValidate(e.target.value.toLowerCase());
  }

  function onChangeRepeatPassword(e) {
    setRepeatPassword(e.target.value);
    passwordRepeatValidate(e.target.value);
  }

  function onRegisterSubmit() {
    fieldsValidation();
    if (fieldsValid) {
      register();
    }
  }

  function register() {
    const user = {
      username: username,
      email: email,
      password: password
    };

    axios
      .post(process.env.REACT_APP_API_URL+'/api/users/add', user)
      .then(res => {
        setUsername("");
        setEmail("");
        setPassword("");
        setRepeatPassword("");

        if (res.data.success) {
          alert(res.data.message);
          props.onRegister();
        }
      })
      .catch(error => {
        alert(error.response.data);
      });
  }

  function usernameValidate(value) {
    if (value.length < 6 || value.length > 15) {
      setUsernameValid(false);
      setUsernameMessage("Username's length should be 6-15 characters");
    } else {
      setUsernameValid(true);
    }

    if (value === "") {
      setUsernameValid(false);
      setUsernameMessage("This field cant be blank");
    }
  }

  function emailValidate(value) {
    let lastAtPos = value.lastIndexOf("@");
    let lastDotPos = value.lastIndexOf(".");

    if (
      !(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        value.indexOf("@@") === -1 &&
        lastDotPos > 2 &&
        value.length - lastDotPos > 2
      )
    ) {
      setEmailValid(false);
      setEmailMessage("Email is not vaild");
    } else {
      setEmailValid(true);
    }

    if (value === "") {
      setEmailValid(false);
      setEmailMessage("This field cant be blank");
    }
  }

  async function passwordRepeatValidate(value) {
    if (value !== password) {
      setRepeatPasswordValid(false);
      setRepeatPasswordMessage("Passwords have to be identically");
    } else {
      setRepeatPasswordValid(true);
    }

    if (value === "") {
      setRepeatPasswordValid(false);
      setRepeatPasswordMessage("This field cant be blank");
    }
  }

  function passwordValidate(value) {
    if (repeatPassword !== value) {
      setRepeatPasswordValid(false);
      setRepeatPasswordMessage("Passwords have to be identically");
    } else {
      setRepeatPasswordValid(true);
    }

    if (value.length < 8) {
      setPasswordValid(false);
      setPasswordMessage("Password minimal length is 8 characters");
    } else {
      setPasswordValid(true);
    }

    if (value === "") {
      setPasswordValid(false);
      setPasswordMessage("This field cant be blank");
    }
  }

  function fieldsValidation() {
    if (
      emailValid &&
      passwordValid &&
      usernameValid &&
      repeatPasswordValid &&
      email &&
      username &&
      password &&
      repeatPassword
    ) {
      setFieldsValid(true);
    } else {
      setFieldsValid(false);
    }
  }
}

export default RegisterForm;
