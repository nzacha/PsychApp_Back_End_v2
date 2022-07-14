import express from 'express'
import Models from '../models'
import { ERROR_OCCURRED, MISSIN_INPUTS, newErrorResponse, newResponse } from  '../config/response'

export async function getChatRoomDetails(request: express.Request, response: express.Response){
    try{
        const { room_id } = request.params;
        if(!room_id){
            return response.status(404).json(newErrorResponse(MISSIN_INPUTS));
        }

        const room = await Models.schema.Chat_Room.findOne({where: {chat_room_id: room_id}, include: [
            {model: Models.schema.User, as: 'members', attributes: {exclude: ['password_salt', 'password_hash', 'token', 'is_verified', 'is_active']}}
        ]});
        if(!room){
            return response.status(404).json(newErrorResponse(ERROR_OCCURRED));
        }

        const messages = await Models.schema.Chat_Message.findAll({where: {chat_room_id: room_id}});
        if(messages){
            response.status(200).json(newResponse({room: room, messages: messages}, 'Chat Room Messages Fetched Successfully'));
        }else{
            return response.status(404).json(newErrorResponse(ERROR_OCCURRED));
        }
    }catch(error: any){
        response.status(400).json(newErrorResponse(error));
    }
}

export async function getChatRoomsOfUser(request: express.Request, response: express.Response){
    try{
        const { user_id } = request.params;
        if(!user_id){
            return response.status(404).json(newErrorResponse(MISSIN_INPUTS));
        }

        const user = await Models.schema.User.findOne({where: {user_id: user_id}, attributes: {exclude: ['password_salt', 'password_hash', 'token', 'is_verified', 'is_active']}});
        if(!user){
            return response.status(404).json(newErrorResponse(ERROR_OCCURRED));
        }

        const rooms = await user.getChatRooms({include: [{model: Models.schema.User, as: 'members'}]});
        if(rooms){
            response.status(200).json(newResponse(rooms, 'Chat Rooms of User Fetched Successfully'));
        }else{
            return response.status(404).json(newErrorResponse(ERROR_OCCURRED));
        }
    }catch(error: any){
        response.status(400).json(newErrorResponse(error));
    }
}
