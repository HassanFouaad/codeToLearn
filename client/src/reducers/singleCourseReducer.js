import { GET_SINGLE_COURSE } from "../actions/types";

const initialState = {};

export default function name(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_COURSE:
      return action.payload;
    default:
      return state;
  }
}
