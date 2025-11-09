import express from "express";
import { isAuthenicated } from "../middlewares/isAuthenicated.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenicated, applyJob);
router.route("/get").get(isAuthenicated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenicated, getApplicants);
router.route("/status/:id/update").post(isAuthenicated, updateStatus);

export default router;
