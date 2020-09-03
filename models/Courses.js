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
  lessons: [{}],
});

module.exports = mongoose.model("Course", courseSchema);
