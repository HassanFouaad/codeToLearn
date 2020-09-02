const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  let reguser = ({ email, password, username } = req.body);
  try {
    await User.findOne({ email: reguser.email }, (err, user) => {
      if (user) {
        return res.status(400).json({ msg: "Email Already Exists" });
      } else {
        let newUser = new User(reguser);
        const salt = bcrypt.genSalt(10);
        user.password = bcrypt.hash(password, salt);
        newUser.save();
        return res.status(200).json({ msg: "Created New User" });
      }
    });
  } catch (error) {
    console.error(error);
    if (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server ERROR" });
    }
  }
};
