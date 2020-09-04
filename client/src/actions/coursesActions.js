import { COURSES_FAILED, COURSES_LOADED } from "./types";
import axios from "axios";
import { returnErrors, clearErrors } from "./errorActions";

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
      });
    });
};
