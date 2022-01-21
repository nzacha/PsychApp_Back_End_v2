import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import { getAnswersOfParticipant } from "../controllers/answers_controller";

const router = express.Router()

router.get(`/list/:code`, verifyToken, getAnswersOfParticipant)

export default router;