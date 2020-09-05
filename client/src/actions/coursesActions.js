import {
  COURSES_FAILED,
  COURSES_LOADED,
  ENROLL,
  ENROLL_SUCCESS,
  ENROLL_FAILED,
  UNENROLL_FAILED,
  UNENROLL_SUCCESS,
} from "./types";
import axios from "axios";
import { returnErrors } from "./errorActions";
import { tokenConfig, loadUser } from "./authActions";

export const getCourses = () => (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  axios
    .get("/api/courses", config)
    .then((res) => {
      console.log(res);
      return dispatch({
        type: COURSES_LOADED,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: COURSES_FAILED,
        payload: error,
      });
    });
};

export const enrollToCourse = (id) => (dispatch, getState) => {
  console.log(tokenConfig(getState));
  const body = {};
  axios
    .put(`/api/courses/${id}/enroll`, body, tokenConfig(getState))
    .then((res) => {
      dispatch(loadUser());
      dispatch({
        type: ENROLL_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: ENROLL_FAILED,
      });
    });
};

export const unenrollToCourse = (id) => (dispatch, getState) => {
  console.log(tokenConfig(getState));
  const body = {};
  axios
    .put(`/api/courses/${id}/unenroll`, body, tokenConfig(getState))
    .then((res) => {
      dispatch(loadUser());
      dispatch({
        type: UNENROLL_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: UNENROLL_FAILED,
      });
    });
};
