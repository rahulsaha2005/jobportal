import express from "express";
import { isAuthenicated } from "../middlewares/isAuthenicated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobByID,
  postJob,
} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenicated, postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(isAuthenicated, getAdminJobs);
router.route("/get/:id").get(getJobByID);

export default router;
