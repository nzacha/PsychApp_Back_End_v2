import express from "express";
import { createQuiz, listQuizzesByProject } from "../controllers/quiz_controller";

const router = express.Router()

router.get(`/list/:project_id`, listQuizzesByProject)
router.put(`/`, createQuiz)

export default router;