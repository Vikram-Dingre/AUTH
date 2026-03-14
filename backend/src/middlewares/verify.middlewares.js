import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import User from "../models/user.models.js";

const verifyUser = asyncErrorHandler(async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    throw new ApiError(401, "UnAuthorized User, No Token");
  }
  const payload = jwt.verify(token, process.env.JWT_ACCESSTOKEN_SECRET);
  const user = await User.findById(payload.id);
  if (!user) {
    throw new ApiError(401, "User Not Found!, Invalid Token");
  }
  req.user = user;
  next();
});

export default verifyUser;
