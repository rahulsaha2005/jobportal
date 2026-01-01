import express from "express";
import {
  register,
  login,
  updateProfile,
  logout,
} from "../controllers/user.controller.js";
import { isAuthenicated } from "../middlewares/isAuthenicated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();
router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router
  .route("/profile/update")
  .post(isAuthenicated, singleUpload, updateProfile);
export default router;
