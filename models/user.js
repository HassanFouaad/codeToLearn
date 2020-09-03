const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      bcrypt: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    courses: {
      type: mongoose.Schema.Types.Array,
      ref: "Course",
    },
    enrollments: {
      type: mongoose.Schema.Types.Array,
      ref: "Course",
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("User", userSchema);
