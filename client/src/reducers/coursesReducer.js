import { COURSES_FAILED, COURSES_LOADED } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case COURSES_LOADED:
      return action.payload;
    case COURSES_FAILED:
      return [];
    default:
      return state;
  }
}
