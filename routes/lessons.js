const express = require("express");
const router = express.Router();
const {
  newLesson,
  updateLesson,
  getAllLessons,
} = require("../controllers/lesson");
const auth = require("../middleware/auth");
const { isStudent, isInstructor } = require("../controllers/user");

router.post("/courses/:courseId/lessons/add", auth, isInstructor, newLesson);
router.put(
  "/courses/:courseId/lessons/:lessonId",
  auth,
  isInstructor,
  updateLesson
);
router.get("/courses/:courseId/lessons", auth, getAllLessons);
module.exports = router;
