const Course = require("../models/Courses");
const User = require("../models/User");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const Notification = require("../models/Notfication");
exports.addCourse = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: "Image couldn't be Uploaded" });
      }
      const teacher = req.user._id;
      const { name, description } = fields;
      if (!name || !description) {
        return res
          .status(400)
          .json({ error: "Please compelete all Course fields" });
      }
      const newCourse = new Course({ name, description, teacher }).populate(
        "teacher",
        "_id firstname"
      );
      await newCourse.updateOne({ teacher: req.user._id }, (err, user) => {
        if (err) console.error(err);
      });
      if (!files.photo) {
        return res.status(400).json({ error: "Please Upload Course Photo" });
      }
      if (files.photo) {
        //1mb = 1000000
        if (files.photo.size > 2000000) {
          return res
            .status(400)
            .json({ error: "Image Size should be less than 2mb" });
        }

        newCourse.photo.data = fs.readFileSync(files.photo.path);
        newCourse.photo.contentType = files.photo.type;
      }
      await newCourse.save((err, response) => {
        if (err) {
          console.log(err);
          res.status(400).json({ error: err });
        }
        response.photo = undefined;
        res.status(200).json({
          message: `${response.name} has been created successfully`,
          response,
        });
      });
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { Courses: newCourse },
        },
        { new: true },
        (err, user) => {
          if (err || !user) {
            console.log(err);
            return res.status(500).json(err);
          }
          newCourse.photo = undefined;
          /*  res.status(200).json({
            msg: "Course has been created successfully",
            user,
            newCourse,
          }); */
        }
      );
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json("ServerError");
  }
};

exports.getCourses = async (req, res) => {
  try {
    let courses = await Course.find({})
      .populate("teacher", "_id firstname lastname email")
      .select("-photo");
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

    if (notEnrolled) {
      return res
        .status(401)
        .json({ error: "Please enroll to the course first" });
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
    let courseFound = await Course.findById(course)
      .populate("teacher", "firstname lastname username email")
      .select("-lessons")
      .select("-photo");
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
    await Notification.create({ receiver: course.teacher }, () => {});
    return res.json(course.teacher);
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
        $pull: { enrollments: course._id },
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
      .select("-teacher")
      .select("-_id")
      .select("-enrollers")
      .select("-reviews");
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

/* Course PHOTO */
exports.coursePhoto = (req, res, next) => {
  if (req.course.photo.data) {
    res.setHeader("Content-Type", req.course.photo.contentType);
    return res.send(req.course.photo.data);
  }
  next();
};

exports.courseById = (req, res, next, id) => {
  Course.findById(id).exec((err, course) => {
    if (err || !course) {
      return res.status(400).json({
        error: "Course not Found!",
      });
    }
    req.course = course;
    next();
  });
};
/* const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.onPart = function (part) {
      if (!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)) {
        this.handlePart(part);
      } else {
        return res.json({ error: "Only JPG or PNG are allowed" });
      }
    };
    form.on("field", (name, value) => {
      if (name === username) {
      }
    });
    form.uploadDir = "uploads/";
    form.parse(req, async (err, fields, files) => {
      const { email, username, password, firstname, lastname } = fields;

      if (files.avatar) {
        //1mb = 1000000
      }
      if (err) {
        console.log(err);
        return res.status(400).json({ error: "Image couldn't be Uploaded" });
      }
      user = new User({
        email,
        username,
        password,
        firstname,
        lastname,
        avatar: files.path,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user,
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 36000000 },
        (err, token) => {
          if (err) {
            console.log(err);
            throw err;
          }
          res.status(200).json({ user, token });
        }
      );
    }); */

exports.courseSearch = async (req, res) => {
  try {
    const query = {};
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: "i" };
    }
    console.log({ query });
    const courses = await Course.find(query).select("-photo");
    if (!courses) {
      return res.status(404).json({ msg: "No Courses Found" });
    }
    res.status(200).json(courses);
  } catch (error) {
    if (error) {
      console.error(error);
      return res.status(400).json({ error });
    }
  }
};
