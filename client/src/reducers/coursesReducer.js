import {
  COURSES_FAILED,
  COURSES_LOADED,
  ENROLL_SUCCESS,
  ENROLL_FAILED,
} from "../actions/types";
const inintialState = {
  courses: [],
  course: null,
  loading: true,
  error: false,
};
export default function (state = inintialState, action) {
  switch (action.type) {
    case COURSES_LOADED:
      return {
        ...state,
        courses: action.payload,
        loading: false,
      };
    case COURSES_FAILED:
      return { ...state, courses: [], loading: false, error: true };
    default:
      return state;
  }
}
