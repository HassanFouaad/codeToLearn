import { CLEAR_ERRORS, GET_ERRORS } from "../actions/types";

const initialState = {
  msg: {},
  status: null,
  id: null,
};

export default function (state = initialState, action) {
  switch (action.types) {
    case GET_ERRORS:
      return {
        msg: action.payload,
        status: action.payload,
        id: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null,
      };
    default:
      return state;
  }
}
