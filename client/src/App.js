import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import SignUp from "./modals/Signup";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./Components/Navbar";
import { loadUser } from "./actions/authActions";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Pages/HomePage";
import CoursesPage from "./Pages/CoursesPage";
class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Navbar></Navbar>
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
            <Route exact path="/courses" component={CoursesPage}></Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
