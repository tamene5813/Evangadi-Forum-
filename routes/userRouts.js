const express = require("express");
const router = express.Router();

// authMiddleweare
const authMiddleware = require("../middleweare/authMiddleware");

// user controllers
const {
  register,
  login,
  checkUser,
  readAllUsers,
} = require("../controller/userController");

// register rout
router.post("/register", register);

// login user
router.post("/login", login);

// check user
router.get("/check", authMiddleware, checkUser);

// get user
router.get("/allUsers", authMiddleware, readAllUsers);
module.exports = router;
