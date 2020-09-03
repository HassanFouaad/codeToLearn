const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  //check token

  if (!token) {
    return res.status(401).json({ msg: "Please Log in" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log(req.user);
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "NOT AUTHORIZED" });
  }
};
