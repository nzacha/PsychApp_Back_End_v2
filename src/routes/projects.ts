import express from "express";
import { ModelNamesEnum } from "../config/models";
import { listProjectsByUserId, fetchActiveQuiz, createProject } from "../controllers/project_controller";
import project from "../models/project";

const router = express.Router()

router.get(`/list/:user_id`, listProjectsByUserId);
router.get(`/quiz/:project_id`, fetchActiveQuiz);
router.put(`/`, createProject);

export default router;