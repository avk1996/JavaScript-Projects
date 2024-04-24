import { asyncyHandler } from "../utils/asychHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const registerUser = asyncyHandler(async (req, resp) => {
  // 1. take username, email, fullName, password from reqest

  console.log(req.body, req.files);
  const { userName, email, fullName, password } = req.body;
  // console.log(`Email: ${email}, Password: ${password}`);

  // 2. validation - if empty,
  if (
    [fullName, email, userName, password].some((field) => field?.trim() == "")
  ) {
    throw new ApiError(400, "all fields are required");
  }

  // 3. check if username and email exists

  // finds the first occurrence of username or email
  const existingUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existingUser)
    throw new ApiError(409, "User email or username already exists");
  // 4. check for avatar, take avatar and coverimage from request

  // console.log(req.files);

  // just like express gives us fields with body multer gives us fields by files
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImgLocalPath = req.files?.coverImage[0]?.path;
  console.log(avatarLocalPath);

  let coverImgLocalPath;

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImgLocalPath = req.files?.coverImage[0]?.path;
  }

  if (!avatarLocalPath) throw new ApiError(400, "Avatar file path required");

  // 5. upload them to cloudinary

  // using await will avoid code to run further telling js engine that until the process below (upload of avatar image) is not done don't go further.
  const isUploadAvatar = await uploadOnCloudinary(avatarLocalPath);
  const isUploadCoverImage = await uploadOnCloudinary(coverImgLocalPath);

  // console.log("Avatar: ", isUploadAvatar);

  // 6. check if the upload process is done or not
  // console.log("avatar details: ", isUploadAvatar);
  if (!isUploadAvatar) throw new ApiError(400, "Avatar is required");

  // 7. create object
  // 8. and save this data in database
  const createUser = await User.create({
    fullName,
    email,
    userName: userName.toLowerCase(),
    password,
    avatar: isUploadAvatar.url,
    // if cover image is not given then we will get empty string
    coverImage: isUploadCoverImage?.url || "",
  });

  // 9. remove password and refresh token

  const isUserCreated = await User.findById(createUser._id).select(
    "-password -refreshToken"
  );

  // 10. check for user creation

  if (!isUserCreated)
    throw new ApiError(500, "Error while registration of user");

  // 11. return response

  return resp
    .status(201)
    .json(new ApiResponse(200, isUserCreated, "user registered successfully"));
});

// method to generate access and refresh token
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const currentUser = await User.findById(userId);

    const accessToken = await currentUser.generateAccessToken();
    const refreshToken = await currentUser.generateRefreshToken();

    currentUser.refreshToken = refreshToken;

    // validate before save will not ask for password again when we try to save.
    // we are going to save refresh token in database
    await currentUser.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Failed to generate refresh and access token");
  }
};

const loginUser = asyncyHandler(async (req, resp) => {
  // 1. take username or email and password from user
  // console.log(req.body);
  const { userName, email, password } = req.body;
  console.log(userName, " ", email);

  // 2. check for empty fields
  if (!(userName || email))
    throw new ApiError(400, "Username or email required");

  if (!password) throw new ApiError(400, "Password is required");

  // 3. check if the username or email exists
  const userIfExists = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (!userIfExists) throw new ApiError(400, "User does not exists");

  // 4. verify password
  const isValidPassword = await userIfExists.isPasswordCorrect(password);

  if (!isValidPassword) throw new ApiError(401, "Password Incorrect");

  // 5. generate access and refresh token

  // 6. store access and refresh token in client and server side
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    userIfExists._id
  );

  // 7. send cookies
  const currentUser = await User.findById(userIfExists._id).select(
    "-password -refreshToken"
  );

  const options = {
    // anyone can modify cookies on frontend but by doing httpOnly as true, client side will not be able to modify.
    // It can only be modifed in server side
    httpOnly: true,
    secure: true,
  };

  // 8. send response 'success' if above all steps are done
  return resp
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          // although it is not a good practice to send user accessToken, refreshToken since it can be stored in local storage
          // but it is good practice to send tokens if the front-end developer is developing mobile application there cookies cannot be set
          // or he just want to save token in local storage for some reason
          user: currentUser,
          accessToken,
          refreshToken,
        },
        "User login successfully"
      )
    );
});

const logOutUser = asyncyHandler(async (req, resp) => {
  // we are able to access the id because we have middleware where we recive data such as _id
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    {
      new: true,
    }
  );

  // clear cookies

  const options = {
    httpOnly: true,
    secure: true,
  };

  return resp
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged out successfully"));
});

const refreshAccessToken = asyncyHandler(async (req, resp) => {
  try {
    // first we will take refresh token from cookies or if mobile app. is there then from body
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    // then we check if the token is autherized or not
    if (incomingRefreshToken) throw new ApiError(401, "Unauthorize request");

    // we will decode the token which was initially created/generated using payload _id
    const decodedIncomingRefreshToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // now decoded refresh token has id then we simply fire nosql query to find user
    const currentUser = await User.findById(decodedIncomingRefreshToken?._id);

    // if user does not exist or fictitious then throw error
    if (!currentUser) throw new ApiError(401, "Invalid Refresh Token");

    // now we match the token
    if (incomingRefreshToken !== currentUser?.refreshToken)
      throw new ApiError(401, "Refresh Token is expired or used");

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(currentUser._id);

    return resp(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "New token generated"
        )
      );
  } catch (error) {
    return new ApiError(401, error?.message || "Invalid Refresh Token");
  }
});

export { registerUser, loginUser, logOutUser, refreshAccessToken };
