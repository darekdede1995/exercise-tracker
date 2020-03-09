import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NewExercisesPage from "./components/newExercisesPage.component";
import TrainigPage from "./components/newTrainingPage.component";
import HistoryPage from "./components/trainingHistoryPage.component";
import ExerciseListPage from "./components/exerciseListPage.component";
import LoginPage from "./components/loginPage.component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/reducers";

function App() {



  return (
    <Provider store={store}>
      <div className="main-container col-12 col-lg-11 mt-5">
        <Router>
          <Switch>
            <Route path="/new-exercise" component={NewExercisesPage} />
            <Route path="/training" component={TrainigPage} />
            <Route path="/history" component={HistoryPage} />
            <Route path="/exercises-list" component={ExerciseListPage} />
            <Route path="/" component={LoginPage} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );

}

export default App;

