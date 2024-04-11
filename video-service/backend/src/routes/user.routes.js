import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
// import { loginUser } from "../controllers/user.controller.js";

const router = Router();

// because of this below route the link is further modified for post
// 2. http://localhost:port/api/v1/users/register
router.route("/register").post(registerUser);

// 2. http://localhost:port/users/login
// router.route("/login").post(loginUser);

export default router;
