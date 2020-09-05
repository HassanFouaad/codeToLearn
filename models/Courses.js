const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "User" }],
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  enrollers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
  compeleted: {
    type: Boolean,
    default: false,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Course", courseSchema);
