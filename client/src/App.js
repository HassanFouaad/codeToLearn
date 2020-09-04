import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/Signup";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/"></Route>
            <Route exact path="/signup" component={SignUp}></Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
