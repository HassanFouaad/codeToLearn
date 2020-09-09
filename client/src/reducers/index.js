import { combineReducers } from "redux";
import errorReducer from "../reducers/errorReducer";
import authReducer from "../reducers/authReducer";
import coursesReducer from "../reducers/coursesReducer";
import lessonsReducer from "../reducers/lessonsReducer";
import notficationReducer from "../reducers/notficationReducer";
import singleCourseReducer from "../reducers/singleCourseReducer";
import { reducer as toastrReducer } from "react-redux-toastr";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  courses: coursesReducer,
  toastr: toastrReducer,
  lessons: lessonsReducer,
  notification: notficationReducer,
  singleCourse: singleCourseReducer,
});
