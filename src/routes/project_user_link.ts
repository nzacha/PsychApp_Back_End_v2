import express from "express";
import { updateAllProjectLinks } from "../controllers/project_user_link_controller";

const router = express.Router()

router.post(`/update/by_project/:project_id`, updateAllProjectLinks)

export default router;