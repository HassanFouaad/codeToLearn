require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user");
const app = express();

mongoose.connect(
  process.env.DATABASEURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log(`Connected To Mongo Database`);
  }
);
//Middlewares
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require("./passport")(passport);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//API ROUTING
app.use("/api", userRouter);
//Server Listening
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
