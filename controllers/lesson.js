const Lesson = require("../models/Lesson");
/* const User = require("../models/User"); */
const Course = require("../models/Courses");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
exports.newLesson = async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.courseId });

    if (!course) return res.status(400).json({ error: "Course Not Found" });
    const teacher = req.user._id;

    if (course.teacher.toString() !== teacher) {
      return res.status(401).json({ error: "Auth Error, Not Your course" });
    }
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: "Image couldn't be Uploaded" });
      }
      const { number, title, text, video } = fields;
      if (!number || !title || !text) {
        return res
          .status(400)
          .json({ error: "Please compelete all Course fields" });
      }
      const newLesson = new Lesson({ number, title, text, video });
      newLesson.save();
      course.lessons.unshift(newLesson);
      await course.save();
      res.status(200).json({ msg: "Lesson has been successfully added" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "SERVER ERROR" });
  }
};

exports.updateLesson = async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.courseId });

    if (!course) return res.status(400).json({ error: "Course Not Found" });
    const teacher = req.user._id;

    if (course.teacher.toString() !== teacher) {
      return res.status(401).json({ error: "Auth Error, Not Your course" });
    }
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: "Image couldn't be Uploaded" });
      }
      const { number, title, text, video } = fields;
      if (!number || !title || !text) {
        return res
          .status(400)
          .json({ error: "Please compelete all Course fields" });
      }
      await Lesson.findByIdAndUpdate(
        req.params.lessonId,
        {
          number,
          title,
          text,
          video,
        },
        { new: true }
      );

      res.status(200).json({ msg: "Lesson has been successfully updated" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "SERVER ERROR" });
  }
};

exports.getAllLessons = async (req, res) => {
  try {
    let course = await Course.findById(req.params.courseId)
      .populate({path: 'lessons', options: { sort: { 'createdAt': 1 } } })
      .sort({ createdAt: 1 });
    if (!course) {
      return res.status(404).json({ error: "No Courses found" });
    }
    if (
      course.enrollers.filter((enroll) => enroll.toString() === req.user._id)
        .length === 0 &&
      req.user.role !== 1
    ) {
      return res
        .status(400)
        .json({ error: "You haven't enrolled to this course" });
    }
    const lessons = course.lessons
    res.status(200).json(lessons);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
