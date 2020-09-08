import axios from "axios";
import { returnErrors } from "./errorActions";
import { toastr } from "react-redux-toastr";
import {
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  USER_LOADING,
  LOGOUT_SUCCESS,
} from "./types";

export const userLodaing = () => ({
  type: USER_LOADING,
});
//Check token and load user

export const loadUser = () => (dispatch, getState) => {
  //User Loading
  dispatch(userLodaing());
  //FETCHING USER
  //Get token from Local Storage

  //Fetching
  axios
    .get("/api/auth", tokenConfig(getState))
    .then((res) => {
      return dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

//
export const tokenConfig = (getState) => {
  //Get token from Local Storage
  let token = getState().auth.token;
  //headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //If token , add to headers

  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
};

//Register Action
//////destruction

export const register = ({
  username,
  firstname,
  lastname,
  email,
  password,
}) => (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const body = { username, firstname, lastname, email, password };
  axios
    .post("/api/signup", body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) => {
      dispatch(
        returnErrors(
          error.response.data,
          error.response.status,
          "REGISTER_FAIL"
        )
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

export const login = ({ email, password }) => (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const body = { email, password };
  axios
    .post("/api/signin", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
      toastr.success("Welcome Back!", "You have successfully logged in");
    })
    .catch((error) => {
      dispatch(
        returnErrors(error.response.data, error.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Logout User
export const logout = () => {
  toastr.success("See you later", "You have successfully logged out");
  return {
    type: LOGOUT_SUCCESS,
  };
};
