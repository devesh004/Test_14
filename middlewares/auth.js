const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const wrapAsync = require("../utils/wrapAsync");
const jwt = require("jsonwebtoken");

exports.authorize = wrapAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // set token from bearer token (Postman)
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Permission denied", 401));
  }

  try {
    console.log("haah");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded = ", decoded);

    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse("Permission denied", 401));
  }
});

exports.isAdmin = wrapAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorResponse("Not authorized", 401));
  }

  if (!req.user.isAdmin) {
    return next(new ErrorResponse("Not authorized as admin", 401));
  }

  next();
});
