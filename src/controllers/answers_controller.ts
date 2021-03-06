import express from "express";
import { ModelNamesEnum } from "../config/models";
import { ERROR_OCCURRED, newErrorResponse, newResponse } from "../config/response";
import Models from '../models'

export async function getAnswersOfParticipant(request: express.Request, response: express.Response){
    try{
        const code = request.params.code;
        if(!code){
            response.status(404).json(newErrorResponse(ERROR_OCCURRED));
            return;
        }
        
        const participant = await Models.schema.Project_Participant.findOne({where: {authentication_code: code}}); 
        if(!participant){
            response.status(404).json(newErrorResponse(ERROR_OCCURRED));
            return;
        }

        const res = await Models.schema.Quiz_Question_Answer.findAll({
            where: {
                participant_id: participant.participant_id
            },
            include: [{model: Models.schema.Quiz_Question}, {model: Models.schema.Project_Participant}]
        });
        response.status(200).json(newResponse(res, 'Answers of Participant Fetched Successfully'));
    }catch(error: any){
        console.log(error);
        response.status(400).json(newErrorResponse(error));
    }
}

export async function insertMultiple(request: express.Request, response: express.Response){
    try{
        const {code, questions} = request.body;
        if(!code || !questions){
            response.status(404).json(newErrorResponse(ERROR_OCCURRED));
            return;
        }
        
        const participant = await Models.schema.Project_Participant.findOne({where: {authentication_code: code}}); 
        if(!participant){
            response.status(404).json(newErrorResponse(ERROR_OCCURRED));
            return;
        }

        console.log(code);
        console.log(questions);
        const res = await Models.schema.Quiz_Question_Answer.bulkCreate(questions);
        console.log(res);
        response.status(200).json(newResponse(res, 'Inserted Multiple Answers for User ' + code + ' Successfully'));
    }catch(error: any){
        console.log(error);
        response.status(400).json(newErrorResponse(error));
    }
}