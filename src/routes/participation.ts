import express from "express";
import { getParticipationsOfProject, createParticipation, updateParticipant, deactivateParticipant } from "../controllers/participant_controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router()

router.get(`/list/:project_id`, verifyToken, getParticipationsOfProject)
router.post(`/status/:id`, verifyToken, deactivateParticipant)
router.put(`/:project_id`, verifyToken, createParticipation)
router.patch(`/:id`, verifyToken, updateParticipant)

export default router;