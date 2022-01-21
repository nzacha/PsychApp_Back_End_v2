import express from "express";
import { listQuizSectionsByQuizId } from "../controllers/quiz_section_controller";

const router = express.Router()

router.get(`/list/:quiz_id`, listQuizSectionsByQuizId)

export default router;