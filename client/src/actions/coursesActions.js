import {
  COURSES_FAILED,
  COURSES_LOADED,
  ADD_COURSE,
  ADD_COURSE_FAIL,
  ENROLL_SUCCESS,
  ENROLL_FAILED,
  UNENROLL_FAILED,
  UNENROLL_SUCCESS,
  ADD_COURSE_LOADING,
  COURSE_LOADING,
} from "./types";
import axios from "axios";
import { returnErrors } from "./errorActions";
import { tokenConfig, loadUser } from "./authActions";
import { toastr } from "react-redux-toastr";
export const getCourses = () => (dispatch) => {
  dispatch({ type: COURSE_LOADING });
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
      if (error) {
        dispatch(returnErrors(error.response.data, error.response.status));
        dispatch({
          type: COURSES_FAILED,
          payload: error,
        });
      }
    });
};

///Adding Course
export const addCourse = (formData) => async (dispatch, getState) => {
  dispatch({ type: ADD_COURSE_LOADING });
  try {
    let res = await axios.post(
      `/api/courses/add`,
      formData,
      tokenConfig(getState)
    );
    dispatch({
      type: ADD_COURSE,
      payload: res.data,
    });
    toastr.success("", `You have successfully added a course`);
  } catch (error) {
    console.log(error);
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({
      type: ADD_COURSE_FAIL,
    });
  }
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
      toastr.success(
        "Good Luck",
        `You have successfully enrolled to the course`
      );
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
      toastr.success("Good Luck", `You have successfully unenrolled`);
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: UNENROLL_FAILED,
      });
    });
};
