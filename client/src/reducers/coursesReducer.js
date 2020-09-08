import {
  COURSES_FAILED,
  COURSES_LOADED,
  ADD_COURSE_LOADING,
  ADD_COURSE,
  COURSE_LOADING,
  ADD_COURSE_FAIL,
} from "../actions/types";
const inintialState = {
  courses: [],
  course: null,
  loading: false,
  error: false,
};
export default function (state = inintialState, action) {
  switch (action.type) {
    case COURSE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case COURSES_LOADED:
      return {
        ...state,
        courses: action.payload,
        loading: false,
      };
    case COURSES_FAILED:
      return { ...state, courses: [], loading: false, error: true };
    case ADD_COURSE_LOADING:
      return { ...state, loading: true };
    case ADD_COURSE:
      return {
        ...state,
        courses: [...state.courses, action.payload.response],
        loading: false,
        error: false,
      };
    case ADD_COURSE_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
