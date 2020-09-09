const Pusher = require("pusher");
const mongoose = require("mongoose");
const pusher = new Pusher({
  appId: "1068808",
  key: "13a4d614457a4ab93b78",
  secret: "d771a1ede131220d7941",
  cluster: "eu",
  encrypted: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("Mongo Database is connected");
  const msgCollection = db.collection("notifications");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    console.log(change.fullDocument);
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("notifications", "inserted", {
        id: messageDetails.receiver,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});
