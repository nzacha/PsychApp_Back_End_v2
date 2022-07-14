import express from "express";
import { getChatRoomDetails, getChatRoomsOfUser } from "../controllers/chat_room_controller";
// import { getChatRoomMessages } from "../controllers/chat_room_controller";

const router = express.Router()

router.get(`/:room_id`, getChatRoomDetails)
router.get(`/user/:user_id`, getChatRoomsOfUser)

export default router;