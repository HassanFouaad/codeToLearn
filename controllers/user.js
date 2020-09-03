const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    ///See if user exitsts
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      username,
      email,
      password,
    });

    //Encrypt Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    //Saving User
    await user.save();

    console.log(req.user);

    //Return JSONWEBTOKEN
    const payload = {
      user: {
        id: user.id,
      },
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

    const payload = { user: { id: user.id } };
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
