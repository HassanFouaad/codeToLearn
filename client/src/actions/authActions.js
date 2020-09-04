import axios from "axios";
import { returnErrors, clearErrors } from "./errorActions";
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

//Check token and load user

export const loadUser = () => (dispatch, getState) => {
  //User Loading
  dispatch({ type: USER_LOADING });
  //FETCHING USER
  //Get token from Local Storage
  
  //Fetching
  axios
    .get("/api/auth", tokenConfig(getState))
    .then((res) => {
      console.log(res);
      return dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status));
      console.log(error);
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
