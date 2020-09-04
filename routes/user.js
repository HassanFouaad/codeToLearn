const express = require("express");
const router = express.Router();
const { signUp, signIn, getUser } = require("../controllers/user");
const {
  userSignUpValidator,
  validate,
  userSigninValidator,
} = require("../validator/index");
const auth = require("../middleware/auth");
router.get("/auth", auth, getUser);
router.post("/signup", userSignUpValidator(), validate, signUp);
router.post("/signin", userSigninValidator(), validate, signIn);

/* router.post("/signup", signIn); */

module.exports = router;
