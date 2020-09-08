const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  addCourse,
  getCourses,
  getSingleCourse,
  enrollTOCourse,
  unenrollTOCourse,
  editCourse,
  delCourse,
  enRolledCourse,
  courseById,
  coursePhoto,
} = require("../controllers/course");
const { isStudent, isInstructor } = require("../controllers/user");
router.post("/courses/add", auth, addCourse);
router.get("/courses", getCourses);
router.get("/courses/:courseId", auth, getSingleCourse);
router.put("/courses/:courseId", auth, editCourse);
router.delete("/courses/:courseId", auth, delCourse);
router.delete("/courses/enrolled/:courseId", auth, isStudent, enRolledCourse);
router.put("/courses/:courseId/enroll", auth, isStudent, enrollTOCourse);
router.put("/courses/:courseId/unenroll", auth, isStudent, unenrollTOCourse);
router.get("/course/photo/:courseId", coursePhoto);
/* router.post("/signup", signIn); */

router.param("courseId", courseById);
module.exports = router;
