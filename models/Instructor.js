var mongoose = require("mongoose");

// Instrucor Schema
var InstructorSchema = mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  Courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

var Instructor = (module.exports = mongoose.model(
  "instructor",
  InstructorSchema
));

module.exports.getInstructorByUsername = function (username, callback) {
  var query = { username: username };
  Instructor.findOne(query, callback);
};
