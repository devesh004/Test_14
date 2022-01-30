const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const wrapAsync = require("../utils/wrapAsync");
const path = require("path");
const crypto = require("crypto");
const { sendMail } = require("../utils/sendMail");

// @desc     Register
// @route    POST /api/auth/register
// @access   Public
exports.registerUser = wrapAsync(async (req, res, next) => {
  const { name, email, password, mobile } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    mobile,
  });

  // Generate token
  const token = user.getJWT();

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    isAdmin: user.isAdmin,
    token: token,
  });
});

// @desc     Login user
// @route    POST /api/auth/login
// @access   Public
exports.loginUser = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // validate email and password
  if (!email || !password) {
    return next(new ErrorResponse("missing credentials", 400));
  }

  // check for user
  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  //check if password matches (method is defined in user model)
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Generate token
  const token = user.getJWT();

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    isAdmin: user.isAdmin,
    token: token,
  });
});

// @desc     Get currently loggedin user
// @route    GET /api/auth/me
// @access   Private
exports.getMe = wrapAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  //   const token = user.getJWT();
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    isAdmin: user.isAdmin,
  });
});

// @desc     Forgot password
// @route    POST /api/auth/forgotpassword
// @access   Public
exports.forgotPassword = wrapAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse("Email not found", 404));
  }

  // Get reset token
  const resetToken = user.getResetToken();
  await user.save({ validateBeforeSave: false });

  //create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/v1/resetpassword/${resetToken}`;

  try {
    // Send mail to user.email
    await sendMail(user.email, resetUrl);

    res.status(200).json({ msg: "Email sent" });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse("Email not sent", 500));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc     Reset password after recieving mail
// @route    PUT /api/auth/resetpassword/:token
// @access   Public
exports.resetPassword = wrapAsync(async (req, res, next) => {
  // get hash token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse("Invalid token", 500));
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// get token from model and create cookie and send response
const sendTokenResponse = (user, code, res) => {
  const token = user.getJWT();
  res.status(code).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    isAdmin: user.isAdmin,
    token: token,
  });
};
