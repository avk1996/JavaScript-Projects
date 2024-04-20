import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { asyncyHandler } from "../utils/asychHandler.js";

// we use underscore to indicate that we are not using this parameter but we required to put there
export const verifyJWT = asyncyHandler(async (req, _, next) => {
  try {
    // if from client side unable to send cookies if user is using mobile application so access token is taken from header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization ")?.replace("Bearer ", "");

    if (!token) {
      throw ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) throw new ApiError(401, "Invalid Access Token");

    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});
