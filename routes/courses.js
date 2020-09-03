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
} = require("../controllers/course");

router.post("/courses/add", auth, addCourse);
router.get("/courses", getCourses);
router.get("/courses/:courseId", auth, getSingleCourse);
router.put("/courses/:courseId", auth, editCourse);
router.post("/courses/:courseId/enroll", auth, enrollTOCourse);
router.post("/courses/:courseId/unenroll", auth, unenrollTOCourse);
/* router.post("/signup", signIn); */

module.exports = router;
