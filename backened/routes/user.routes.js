import express from "express";
import {
  register,
  login,
  updateProfile,
  logout,
} from "../controllers/user.controller.js";
import { isAuthenicated } from "../middlewares/isAuthenicated.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenicated, updateProfile);
export default router;
