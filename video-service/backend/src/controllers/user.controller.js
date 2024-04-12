import { asyncyHandler } from "../utils/asychHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncyHandler(async (req, resp) => {
  // 1. take username, email, fullName, password from reqest

  const { userName, email, fullName, password } = req.body;
  console.log(`Email: ${email}, Password: ${password}`);

  // 2. validation - if empty,
  if (
    [fullName, email, userName, password].some((field) => field?.trim() == "")
  ) {
    throw new ApiError(400, "all fields are required");
  }

  // 3. check if username and email exists

  // finds the first occurrence of username or email
  const existingUser = User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existingUser)
    throw new ApiError(409, "User email or username already exists");

  // 4. check for avatar, take avatar and coverimage from request

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImgLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) throw new ApiError(400, "Avatar file path required");

  // 5. upload them to cloudinary

  // using await will avoid code to run further telling js engine that until the process below (upload of avatar image) is not done don't go further.
  const isUploadAvatar = await uploadOnCloudinary(avatarLocalPath);
  const isUploadCoverImage = await uploadOnCloudinary(coverImgLocalPath);

  // 6. check if the upload process is done or not

  if (!isUploadAvatar) throw new ApiError(400, "Avatar is required");

  // 7. create object

  // 8. and save this data in database
  const createUser = await User.create({
    fullName,
    email,
    userName: userName.toLower,
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

  if (isUserCreated)
    throw new ApiError(500, "Error while registration of user");

  // 11. return response

  return resp
    .status(201)
    .json(new ApiResponse(200, isUserCreated, "user registered successfully"));
});

export { registerUser };
