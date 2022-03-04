import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import { getAnswersOfParticipant, insertMultiple } from "../controllers/answers_controller";

const router = express.Router()

router.get(`/list/:code`, verifyToken, getAnswersOfParticipant)
router.put(`/multiple`, insertMultiple)

export default router;