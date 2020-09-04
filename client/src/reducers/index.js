import { combineReducers } from "redux";
import errorReducer from "../reducers/errorReducer";
import authReducer from "../reducers/authReducer";
export default combineReducers({ error: errorReducer, auth: authReducer });
