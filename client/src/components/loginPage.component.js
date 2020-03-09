import "../styles/loginPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import LoginForm from "./loginPageDir/loginForm.component";
import RegisterForm from "./loginPageDir/registerForm.component";


function LoginPage() {

  const [displayLoginForm, setDisplayLoginForm] = useState(true);
  const [displayRegisterForm, setDisplayRegisterForm] = useState(false);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6">
          <div className="text-center">
            <Title />
          </div>
          <div className="col-12">
            <ButtonGroup
              loginAction={onChangeDisplayLoginForm}
              registerAction={onChangeDisplayRegisterForm}
            />
          </div>
          <div className="row justify-content-center">
            <div className="col-12" hidden={!displayLoginForm}>
              <LoginForm />
            </div>
            <div className="col-12" hidden={!displayRegisterForm}>
              <RegisterForm onRegister={onChangeDisplayLoginForm} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  function onChangeDisplayLoginForm() {
    setDisplayLoginForm(!displayLoginForm);
    setDisplayRegisterForm(false);
  }

  function onChangeDisplayRegisterForm() {
    ;
    setDisplayRegisterForm(!displayRegisterForm);
    setDisplayLoginForm(false);
  }
}

function Title() {
    return (
      <div className="title-container">
        <h1 className="h1-title">Let's start training</h1>
      </div>
    );
  
}

function ButtonGroup(props) {

    return (
      <div className="button-group-container">
        <button
          className="btn btn-outline-dark m-3 p-3"
          onClick={props.loginAction}
        >
          login
        </button>
        <button
          className="btn btn-outline-dark m-3 p-3"
          onClick={props.registerAction}
        >
          register
        </button>
      </div>
    );
  
}

export default LoginPage;
