import express from 'express';
import Models from '../models';
import { ERROR_OCCURRED, INPUTS_MISSMATCH, MISSIN_INPUTS, newErrorResponse, newResponse } from  '../config/response'
import { getUsersByProject } from "./queries";

export async function sendNotification(request: express.Request, response: express.Response){
    try{
        const {title, description, message, users, projects} = request.body;
        if(!users && !projects){
            return response.status(400).json(newErrorResponse(MISSIN_INPUTS));
        }
        if(!title){
            return response.status(404).json(newErrorResponse(ERROR_OCCURRED));
        }
        
        let receivers = []
        if(projects){
            if(!Array.isArray(projects)){
                return response.status(404).json(newErrorResponse(INPUTS_MISSMATCH));
            }
            await Promise.all(projects.map(async(p: number) => {
                receivers.push( ...(await getUsersByProject(p)));
            }))
        }else if(users){
            if(users == 'all'){
                receivers = (await Models.schema.User.findAll()).map((user: any) => user.user_id);
            }else if(Array.isArray(users)){
                receivers = users;
            }else{
                return response.status(404).json(newErrorResponse(INPUTS_MISSMATCH));
            }
        }

        const notifications = receivers.map((r: number) => ({ title: title, description: description, message: message, user_id: r }));
        Models.schema.Alert.bulkCreate(notifications);
        response.status(200).json(newResponse(notifications, 'Notifications Sent'));
    }catch(error: any){
        response.status(400).json(newErrorResponse(error));
    }
}
