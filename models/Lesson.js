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
    compeleted: {
      type: Boolean,
      default: false,
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
