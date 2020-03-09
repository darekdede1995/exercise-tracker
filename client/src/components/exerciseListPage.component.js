import "../styles/exerciseListPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import NavBar from "./sidebar/sideBar.component";
import ExerciseList from "./exerciseListPageDir/exerciseList.component";

function ExerciseListPage() {
  return (
    <div>
      <div className="row d-lg-none">
        <div className="col-12">
          <NavBar />
        </div>
        <div className="col-12">
          <ExerciseList />
        </div>
      </div>
      <div className="row d-none d-lg-flex">
        <div className="col-3">
          <NavBar />
        </div>
        <div className="col-9">
          <ExerciseList />
        </div>
      </div>
    </div>
  );
}

export default ExerciseListPage;
