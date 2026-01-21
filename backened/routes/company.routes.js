import express from "express";
import {
  registerCompany,
  getCompany,
  updateCompany,
  getCompanyById,
} from "../controllers/company.controller.js";

import { isAuthenicated } from "../middlewares/isAuthenicated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();
router.route("/register").post(isAuthenicated, singleUpload, registerCompany);
router.route("/get").get(isAuthenicated, getCompany);
router.route("/get/:id").get(isAuthenicated, getCompanyById);
router.route("/update/:id").put(isAuthenicated, updateCompany);

export default router;
