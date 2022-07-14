import express from "express";
import { getAlertsOfUser } from "../controllers/alerts_controller";

const router = express.Router()

router.get(`/list/:user_id`, getAlertsOfUser)

export default router;