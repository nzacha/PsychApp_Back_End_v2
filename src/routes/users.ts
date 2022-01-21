import express from "express";
import { createUser, updateUser } from "../controllers/user_controller";

const router = express.Router()

router.put(`/new`, createUser);
router.patch(`/:id`, updateUser);

export default router;