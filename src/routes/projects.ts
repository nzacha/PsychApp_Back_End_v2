import express from "express";
import { listProjectsByUserId, fetchActiveQuiz, createProject } from "../controllers/project_controller";

const router = express.Router()

router.get(`/list/:user_id`, listProjectsByUserId);
router.get(`/quiz/:project_id`, fetchActiveQuiz);
router.put(`/`, createProject);

export default router;