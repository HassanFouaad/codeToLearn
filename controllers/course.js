const Course = require("../models/Courses");
const User = require("../models/User");
const { json } = require("body-parser");

exports.addCourse = async (req, res) => {
  const { name, description } = req.body;
  try {
    console.log(req.user);
    let newCourse = new Course({ name, description, teacher: req.user._id });
    await newCourse.save();
    await newCourse.update({ teacher: req.user._id });
    console.log("Addidng user " + req.user);
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { courses: newCourse },
      },
      { new: true },
      (err, user) => {
        if (err || !user) {
          return res.status(500).json("ServerError");
        }
        res.status(200).json({
          error: "Course has been created successfully",
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
      res.status(500).json({ error: "SERVER ERRORS" });
    }
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "SERVER ERRORS" });
  }
};

exports.enRolledCourse = async (req, res, next) => {
  let course = req.params.courseId;
  try {
    let courseFound = await Course.findById(course).populate(
      "teacher",
      "username email"
    );
    if (!courseFound) {
      res.status(404).json({ error: "No Courses Found" });
    }
    let notEnrolled =
      courseFound.enrollers.filter(
        (enroller) => enroller.toString() === req.user._id
      ).length === 0;
    console.log(notEnrolled);
    if (notEnrolled) {
      return res.status(401).json({ error: "Please enroll to the course first" });
    }
    res.status(200).json(courseFound);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "SERVER ERRORS" });
  }
};
//Signle Course
exports.getSingleCourse = async (req, res) => {
  let course = req.params.courseId;
  try {
    let courseFound = await Course.findById(course).populate(
      "teacher",
      "username email"
    ).select('--classes')
    if (!courseFound) {
      res.status(404).json({ error: "No Courses Found" });
    }
    /* let notEnrolled =
      courseFound.enrollers.filter(
        (enroller) => enroller.toString() === req.user._id
      ).length === 0;
    console.log(notEnrolled);
    if (notEnrolled) {
      return res.status(401).json({ msg: "Please enroll to the course first" });
    } */
    res.status(200).json(courseFound);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "SERVER ERRORS" });
  }
};

/////Enroll To Course enrollments
exports.enrollTOCourse = async (req, res) => {
  let courseReg = req.params.courseId;
  try {
    let course = await Course.findById(courseReg);
    if (!course) {
      return res.status(404).json({ error: "No Courses found" });
    }
    if (
      course.enrollers.filter(
        (enroller) => enroller.toString() === req.user._id
      ).length > 0
    ) {
      return res
        .status(400)
        .json({ error: "You have already Enrolled to the course :)" });
    }
    course.enrollers.unshift(req.user._id);

    await course.save();
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { enrollments: course },
      },
      { new: true }
    );
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
      return res.status(404).json({ error: "No Courses found" });
    }
    if (
      course.enrollers.filter((enroll) => enroll.toString() === req.user._id)
        .length === 0
    ) {
      return res.status(400).json({ error: "You have not Enrolled yet" });
    }
    const removeIndex = course.enrollers
      .map((enroll) => enroll.toString())
      .indexOf(req.user._id);
    course.enrollers.splice(removeIndex, 1);
    await course.save();
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { enrollments: course.toString() },
      },
      { new: true }
    );
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
      return res.status(404).json({ error: "No Courses found" });
    }
    console.log(courseFound.teacher);
    if (!courseFound.teacher.toString() === req.user._id) {
      return res.status(400).json({
        error: "You don't Own this course, Try harder to hack us next time",
      });
    }
    const { name, description, lessons } = req.body;
    await Course.findByIdAndUpdate(
      req.params.courseId,
      req.body,
      (err, course) => {
        if (err) {
          console.error(err);
        }
        res.json(course);
      }
    )
      .select("--teacher ")
      .select("--_id")
      .select("-enrollers")
      .select("--reviews");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

exports.delCourse = async (req, res) => {
  try {
    let courseFound = await Course.findById(req.params.courseId);
    if (!courseFound) {
      return res.status(404).json({ error: "No Courses found" });
    }
    if (!courseFound.teacher.toString() === req.user._id) {
      return res.status(400).json({
        error: "You don't Own this course, Try harder to hack us next time",
      });
    }
    courseFound.remove();
    return res.status(200).json({ error: "Removed the course" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
