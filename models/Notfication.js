const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notficationSchema = new Schema({
  receiver: {
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("notification", notficationSchema);
