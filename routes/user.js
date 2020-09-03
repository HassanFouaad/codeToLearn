const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/user");

router.post("/signup", signUp);
router.post("/signin", signIn);

/* router.post("/signup", signIn); */

module.exports = router;
