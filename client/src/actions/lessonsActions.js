import {
  LESSONS_LOADED,
  LESSONS_FAILED,
  LESSONS_LOADING,
  ADD_LESSON,
  ADD_LESSON_SUCESS,
  ADD_LESSON_FAIL,
  ADD_LESSON_LOADING,
} from "./types";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";
import { toastr } from "react-redux-toastr";
import axios from "axios";

export const addLesson = (formData, courseId) => async (dispatch, getState) => {
  dispatch({ type: ADD_LESSON_LOADING });
  try {
    let res = await axios.post(
      `/api/courses/${courseId}/lessons/add`,
      formData,
      tokenConfig(getState)
    );
    console.log(res);
    dispatch({
      type: ADD_LESSON,
      payload: res.data,
    });
    toastr.success(res.data.msg);
  } catch (error) {
    console.log(error.response.data);
    toastr.error(error.response.data.error);
    dispatch({
      type: ADD_LESSON_FAIL,
    });
  }
};

export const getLessons = (courseId) => (dispatch, getState) => {
  dispatch({ type: LESSONS_LOADING });
  axios
    .get(`/api/courses/${courseId}/lessons`, tokenConfig(getState))
    .then((res) => {
      console.log(res);
      return dispatch({
        type: LESSONS_LOADED,
        payload: res.data,
      });
    })
    .catch((error) => {
      if (error) {
        dispatch(returnErrors(error.response.data, error.response.status));
        dispatch({
          type: LESSONS_FAILED,
          payload: error,
        });
      }
    });
};
