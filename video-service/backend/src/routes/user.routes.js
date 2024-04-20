import { Router } from "express";
import {
  logOutUser,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";

// middleware before process
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// because of this below route the link is further modified for post
// 2. http://localhost:port/api/v1/users/register
// Injection of middleware upload via post
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

// 2. http://localhost:port/api/v1/users/login
router.route("/login").post(loginUser);

// secured routes
// http://localhost:port/api/v1/users/logout
router.route("/logout").post(verifyJWT, logOutUser);

export default router;
