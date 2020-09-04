import { combineReducers } from "redux";
import errorReducer from "../reducers/errorReducer";
import authReducer from "../reducers/authReducer";
import coursesReducer from "../reducers/coursesReducer";
export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  courses: coursesReducer,
});
