import express from "express";
import { sendNotification } from "../services/notifications";

const router = express.Router()
router.post(`/notification/send`, sendNotification);
export default router;