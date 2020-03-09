import "../styles/trainingHistoryPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import NavBar from "./sidebar/sideBar.component";
import HistoryList from "./trainingHistoryPageDir/trainingHistoryList.component";

function HistoryPage(props) {

  return (
    <div>
      <div className="row d-lg-none">
        <div className="col-12">
          <NavBar />
        </div>
        <div className="col-12 ">
          <HistoryList />
        </div>
      </div>
      <div className="row d-none d-lg-flex">
        <div className="col-3">
          <NavBar />
        </div>
        <div className="col-9">
          <HistoryList />
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
