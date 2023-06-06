const express = require("express");

const router = express.Router();

const {signup, login, forgotpassword, resetpassword} = require("../controllers/auth")

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/forgotpassword").post(forgotpassword)
router.route("/passwordreset/:resetToken").put(resetpassword)




module.exports = router