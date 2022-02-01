const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");
const { authorize } = require("../middlewares/auth");

// Re-Route to other resources router
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authorize, getMe);
router.post("/forgotpassword", forgotPassword);
router.put("/resetPassword/:token", resetPassword);

module.exports = router;
