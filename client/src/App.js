import React, { useEffect } from "react";
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
import PrivateRoute from "./Components/PrivateRoutes/PrivateRoute";
import InstructorRoute from "./Components/InstructorPage/InstructorRoute";
import AddCoursePage from "./Pages/AddCoursePage";
import ReduxToastr from "react-redux-toastr";
import SingleCoursePage from "./Pages/SingleCoursePage";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-left"
        getState={(state) => state.toastr}
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      ></ReduxToastr>
      <BrowserRouter>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/signup" component={SignUp}></Route>
          <Route exact path="/courses" component={CoursesPage}></Route>
          <Route path="/courses/:courseId" component={SingleCoursePage}></Route>
          <PrivateRoute
            exact
            path="/instructor/dashboard"
            component={() => <InstructorRoute> </InstructorRoute>}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/instructor/addcourse"
            component={AddCoursePage}
          ></PrivateRoute>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
