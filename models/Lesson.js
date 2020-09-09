const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lessonSchema = new Schema(
  {
    number: {
      type: Number,
    },
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    video: {
      type: String,
    },
    compeletedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = Lesson = mongoose.model("Lesson", lessonSchema);
