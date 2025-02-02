require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user");
const coursesRouter = require("./routes/courses");
const lessonsRouter = require("./routes/lessons");
const app = express();
async = require("async");
mongoose.connect(
  process.env.DATABASEURL,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log(`Connected To Mongo Database`);
  }
);
/* require("./middleware/trigger"); */
//Middlewares
/* app.use(passport.initialize()); */
/* app.use(passport.session());
require("./passport")(passport); */
app.disable("etag");
app.use(express.json({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//API ROUTING
app.use("/api", userRouter);
app.use("/api", coursesRouter);
app.use("/api", lessonsRouter);
//Server Listening
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
