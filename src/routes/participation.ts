import express from "express";
import { getParticipationsOfProject, createParticipation, updateParticipant, deactivateParticipant } from "../controllers/participant_controller";

const router = express.Router()

router.get(`/list/:project_id`, getParticipationsOfProject)
router.post(`/status/:id`, deactivateParticipant)
router.put(`/:project_id`, createParticipation)
router.patch(`/:id`, updateParticipant)

export default router;