import dotenv from 'dotenv';
dotenv.config(); // {path: './.env'}

import express from "express";
const app = express();

import cors from "cors";
app.use(cors());

import http from 'http';
const server = http.createServer(app);

import { Server } from "socket.io";
import { Chat_Message } from './src/models/chat_message';
import { User } from './src/models/user';
import Models from './src/models';
import { Chat_Room } from './src/models/chat_room';

export class ChatServer {
    constructor(port: string){
        const io = new Server(server, {
            cors: {
                origin: 'http://localhost:3000'
            }
        });

        io.on('connection', async (socket) => {
            let user = await Models.schema.User.findOne({where: {user_id: socket.handshake.query.user_id}});
            if (user) {
                user = await user.update({last_online: new Date()});
            } else {
                return;
            }

            //rooms referenced by socket
            const rooms: number[]=[];
            //leave room callback
            function leaveRoom(room_id: number, uid?: number){
                //send leave message to room
                socket.to(`/${room_id}`).emit('chat', JSON.stringify(new Chat_Message({room_id: room_id, user_id: 'system', text: `user ${socket.id} left the room!`})));
                socket.leave(`/${room_id}`);
                socket.broadcast.to(`/${room_id}`).emit('leftRoom', JSON.stringify(user));    
            }
        
            //on join room
            socket.on('joinRoom', async (room_id: number, uid: number, updateRoomState: (roomState: Chat_Room) => void ) => {
                if(user){
                    socket.join(`/${room_id}`);
                    rooms.push(room_id);
                    
                    //send user join message to room
                    socket.broadcast.to(`/${room_id}`).emit('chat', JSON.stringify(new Chat_Message({room_id: room_id, user_id: 'system', text: `user ${socket.id} joined the room!`})));
                    socket.broadcast.to(`/${room_id}`).emit('joinedRoom', JSON.stringify(user));    

                    // const room = await Chat_Room.findOne({where: {room_id: room_id}, include: [{model: Chat_Message, as: 'messages'}, {model: User, as: 'users'}]});
                    // if(room) {
                    //     updateRoomState(room);
                    // }
                }
            })
        
            //on leave room
            socket.on('leaveRoom', leaveRoom);
        
            //on chat
            socket.on('chat', (message: Chat_Message) => {
                // console.log(`${user?.first_name} ${user?.last_name} said: ${message.text}`)
                Chat_Message.create(message).then(() => {
                    socket.broadcast.to(`/${message.chat_room_id}`).emit('chat', JSON.stringify(message));
                });
            })
        
            //on disconnect
            socket.on('disconnect', () => {
                console.log(`${socket.id} disconnected`);
                //leave referenced rooms
                rooms.forEach(room_id => leaveRoom(room_id, user?.user_id))
                rooms.length = 0;
            });
        }, );
        
        server.listen(
            port,
            () => {console.log(`Server is running on the port on: ${(port)}`)}
        );
    }
}