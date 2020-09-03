var mongoose = require("mongoose");

var StudentSchema = mongoose.Schema({
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
  Courses: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});

let Student = (module.exports = mongoose.model("Student", StudentSchema));

module.exports.getStudentByUsername = function (username, callback) {
  var query = { username: username };
  Student.findOne(query, callback);
};
