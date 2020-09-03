const Course = require("../models/Courses");
const User = require("../models/User");
const { json } = require("body-parser");

exports.addCourse = async (req, res) => {
  const { name, description } = req.body;
  try {
    console.log(req.user);
    let newCourse = new Course({ name, description, teacher: req.user.id });
    await newCourse.save();
    await newCourse.update({ teacher: req.user.id });
    console.log("Addidng user " + req.user);
    User.findByIdAndUpdate(
      req.user.id,
      {
        $push: { courses: newCourse },
      },
      { new: true },
      (err, user) => {
        if (err) {
          console.error(err);
        }
        user.password = undefined;
        res.status(200).json({
          msg: "Course has been created successfully",
          user,
          newCourse,
        });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json("ServerError");
  }
};

exports.getCourses = async (req, res) => {
  try {
    let courses = await Course.find({});
    if (!courses) {
      res.status(500).json({ msg: "SERVER ERRORS" });
    }
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "SERVER ERRORS" });
  }
};

//Signle Course
exports.getSingleCourse = async (req, res) => {
  let course = req.params.courseId;
  try {
    let courseFound = await Course.findById(course);
    if (!courseFound) {
      res.status(404).json({ msg: "No Courses Found" });
    }
    let notEnrolled =
      courseFound.enrollers.filter(
        (enroller) => enroller.toString() === req.user.id
      ).length === 0;
    console.log(notEnrolled);
    if (notEnrolled) {
      return res.status(401).json({ msg: "Please enroll to the course first" });
    }
    res.status(200).json(courseFound);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "SERVER ERRORS" });
  }
};

/////Enroll To Course enrollments
exports.enrollTOCourse = async (req, res) => {
  let courseReg = req.params.courseId;
  try {
    let course = await Course.findById(courseReg);
    if (!course) {
      return res.status(404).json({ msg: "No Courses found" });
    }
    if (
      course.enrollers.filter((enroller) => enroller.toString() === req.user.id)
        .length > 0
    ) {
      return res
        .status(400)
        .json({ msg: "You have already Enrolled to the course :)" });
    }
    course.enrollers.unshift(req.user.id);
    await course.save();
    return res.json(course.enrollers);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

exports.unenrollTOCourse = async (req, res) => {
  let courseReg = req.params.courseId;
  try {
    let course = await Course.findById(courseReg);
    if (!course) {
      return res.status(404).json({ msg: "No Courses found" });
    }
    if (
      course.enrollers.filter((enroll) => enroll.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "You have not Enrolled yet" });
    }
    const removeIndex = course.enrollers
      .map((enroll) => enroll.toString())
      .indexOf(req.user.id);
    course.enrollers.splice(removeIndex, 1);
    await course.save();
    return res.json(course.enrollers);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

exports.editCourse = async (req, res) => {
  try {
    let courseFound = await Course.findById(req.params.courseId);
    if (!courseFound) {
      return res.status(404).json({ msg: "No Courses found" });
    }
    console.log(courseFound.teacher);
    if (!courseFound.teacher.toString() === req.user.id) {
      return res.status(400).json({
        msg: "You don't Own this course, Try harder to hack us next time",
      });
    }
    return res.json(courseFound);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
