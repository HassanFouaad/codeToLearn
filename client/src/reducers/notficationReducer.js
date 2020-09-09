import { GET_NOTFICATIONS } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NOTFICATIONS:
      return {
        msg: action.payload.msg,
      };
    default:
      return state;
  }
}
