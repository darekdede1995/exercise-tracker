import "../styles/newExercisePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import NewExerciseForm from "./newExerciseDir/newExercisePattern.component";
import ExerciseList from "./newExerciseDir/exerciseListSnippet.component";
import NavBar from "./sidebar/sideBar.component";


function NewExercisesPage() {
  return (
    <div>
      <div className="row d-lg-none">
        <div className="col-12">
          <NavBar />
        </div>
        <div className="col-12">
          <TitleMobile />
          <NewExerciseForm />
        </div>
        <div className="col-12">
          <ExerciseList />
        </div>
      </div>
      <div className="row d-none d-lg-flex" >
        <div className="col-3">
          <NavBar />
        </div>
        <div className="col-5">
          <Title />
          <NewExerciseForm />
        </div>
        <div className="col-4">
          <ExerciseList />
        </div>
      </div>
    </div>
  );
}

function Title() {
  return <h1 className="h1-title">Create new exercise:</h1>;
}

function TitleMobile() {
  return <h1 className="h1-title-mobile">Create new exercise:</h1>;
}

export default NewExercisesPage;
