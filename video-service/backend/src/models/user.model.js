import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      // usefull for searching but affects performance how?
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary
      required: true,
    },
    coverImage: {
      type: String, // cloudinary
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// password encyption using bcrypt
// console.log("in user module");
// when we try to save user data just before that the password is encrypted
userSchema.pre("save", async function (next) {
  // if field is modified then don't need to encryp the password again
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// password checking using bcrypt

// console.log("in user module");
userSchema.methods.isPasswordCorrect = async function (password) {
  // retuns if the password is correct or not
  return await bcrypt.compare(password, this.password);
};

// generate access token

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// generate refresh token

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = model("User", userSchema);
