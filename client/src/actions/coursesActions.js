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
  GET_SINGLE_COURSE,
} from "./types";
import axios from "axios";
import { returnErrors } from "./errorActions";
import { tokenConfig, loadUser } from "./authActions";
import { toastr } from "react-redux-toastr";
import Pusher from "pusher-js";
import { getLessons } from "./lessonsActions";
const pusher = new Pusher("13a4d614457a4ab93b78", {
  cluster: "eu",
});
const channel = pusher.subscribe("notifications");
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
      dispatch(getLessons(id));
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
      dispatch(getLessons(id));
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

export const getSingleCourse = (courseId) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const res = await axios.get(
      `/api/courses/${courseId}`,
      tokenConfig(getState)
    );
    dispatch({
      type: GET_SINGLE_COURSE,
      payload: res.data,
    });
  } catch (error) {}
};
