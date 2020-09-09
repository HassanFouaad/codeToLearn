import {
  LESSONS_LOADED,
  LESSONS_FAILED,
  LESSONS_LOADING,
  ADD_LESSON,
  ADD_LESSON_SUCESS,
  ADD_LESSON_FAIL,
  ADD_LESSON_LOADING,
} from "../actions/types";
const inintialState = {
  lessons: [],
  loading: false,
  error: false,
};
export default function (state = inintialState, action) {
  switch (action.type) {
    case LESSONS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LESSONS_LOADED:
      return {
        ...state,
        lessons: action.payload,
        loading: false,
      };
    case LESSONS_FAILED:
      return { ...state, lessons: [], loading: false, error: true };
    case ADD_LESSON_LOADING:
      return { ...state, loading: true };
    case ADD_LESSON:
      return {
        ...state,
        lessons: [...state.lessons],
        loading: false,
        error: false,
      };
    case ADD_LESSON_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
