import express from "express";
import { authenticateUser, validateToken, registerUser } from "../controllers/authentication_controller";
import { authenticateParticipant } from "../controllers/participant_controller";

const router = express.Router()

router.post(`/login`, authenticateUser)
router.post(`/participate`, authenticateParticipant)
router.post(`/validateToken`, validateToken)
router.post(`/register`, registerUser)

export default router;