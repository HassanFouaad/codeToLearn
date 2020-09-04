const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const { email, username, password, firstname, lastname } = req.body;
    ///See if user exitsts
    let user = await User.findOne({ email });
    console.log(user);
    if (user) {
      console.log(user);
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      username,
      email,
      password,
      firstname,
      lastname,
    });

    //Encrypt Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    //Saving User
    await user.save();
    //Return JSONWEBTOKEN
    const payload = {
      user,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

exports.signIn = async (req, res) => {
  let { email, password } = req.body;
  console.log(req.body);
  try {
    let user = await User.findOne({ email }, (err, user) => {
      if (!user || err) {
        return res
          .status(401)
          .json({ error: "Email doesn't exists, Please Signup and try again" });
      }
    });
    if (!password) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Please Enter your password" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invaild Credentials" });
    }

    const payload = {
      user,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(400).json(err);
  }
};

//SignOut
exports.isInstructor = (req, res, next) => {
  if (req.user.role === 0) {
    return res
      .status(400)
      .json({ error: "Can't Perform this action while you are student" });
  }
  next();
};

exports.isStudent = (req, res, next) => {
  console.log(req.user);
  if (req.user.role === 1) {
    return res
      .status(400)
      .json({ error: "Can't Perform this action while you are instructor" });
  }
  next();
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
