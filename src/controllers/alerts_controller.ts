import express from "express";
import { ModelNamesEnum } from "../config/models";
import { ERROR_OCCURRED, newErrorResponse, newResponse } from "../config/response";
import Models from '../models'

export async function getAlertsOfUser(request: express.Request, response: express.Response){
    try{
        const user_id = request.params.user_id;
        if(!user_id){
            response.status(404).json(newErrorResponse(ERROR_OCCURRED));
            return;
        }
        
        const user = await Models.schema.User.findOne({where: {user_id: user_id}}); 
        if(!user){
            response.status(404).json(newErrorResponse(ERROR_OCCURRED));
            return;
        }

        const res = await Models.schema.Alert.findAll({
            where: {
                user_id: user.user_id
            }
        });
        response.status(200).json(newResponse(res, 'Alerts of User Fetched Successfully'));
    }catch(error: any){
        console.log(error);
        response.status(400).json(newErrorResponse(error));
    }
}
