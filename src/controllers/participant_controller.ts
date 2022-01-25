import express from 'express';
import Models from '../models'
import { ERROR_OCCURRED, newErrorResponse, newResponse } from '../config/response';
import { getDigitsCode } from '../config/security';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../app';

export async function getParticipationsOfProject(request: express.Request, response: express.Response){
    try{
        const project_id = request.params.project_id;
        if(!project_id){
            response.status(404).json(newErrorResponse(ERROR_OCCURRED));
            return;
        }
        
        const res = await Models.Project_Participant.findAll({where: {
            project_id: project_id,
        }});
        response.status(200).json(newResponse(res, 'Participants Fetched Successfully'));
    }catch(error: any){
        response.status(400).json(newErrorResponse(error));
    }
}

export async function createParticipation(request: express.Request, response: express.Response){
    try{
        const project_id = request.params.project_id;
        if(!project_id){
            response.status(404).json(newErrorResponse(ERROR_OCCURRED));
            return;
        }
        const authCode = getDigitsCode(new Date().getTime().toString(), 6, SECRET_KEY);
        console.log(authCode);
        const data = {...request.body, authentication_code: authCode, project_id: project_id};
        
        const res = await Models.Project_Participant.create(data);
        response.status(200).json(newResponse(res, 'Participant Created Successfully'));
    }catch(error: any){
        response.status(400).json(newErrorResponse(error));
    }
}

export async function authenticateParticipant(request: express.Request, response: express.Response){
    try{
        const {code} = request.body;
        if(!code){
            return response.status(200).json(newErrorResponse('Missing information on participant login'))
        }
        let participant = await Models.Project_Participant.findOne({where: {authentication_code: code}, attributes: {exclude: ['token']}});
        if(!participant){
            return response.status(200).json(newErrorResponse('Participant not found'));    
        }
        var token = jwt.sign({participant: participant}, SECRET_KEY, {
            // expiresIn: "30m"
        });
        await participant.update({token: token});
        participant = await Models.Project_Participant.findOne({where: {participant_id: participant.participant_id}, include: Models.Project});
        response.status(200).json(newResponse(participant, 'Authentication Successful'));
    }catch(error: any){
        response.status(400).json(newErrorResponse(error));
    }
}

export async function updateParticipant(request: express.Request, response: express.Response){
    try{
        const {id} = request.params;
        if(!id){
            return response.status(200).json(newErrorResponse('Missing information on participant update'))
        }
        let participant = await Models.Project_Participant.findOne({where: {participant_id: id}});
        if(!participant){
            return response.status(200).json(newErrorResponse('Participant not found'));    
        }
        await participant.update({...request.body});
        participant = await Models.Project_Participant.findOne({where: {participant_id: id}, include: Models.Project});
        response.status(200).json(newResponse(participant, 'Participant Updated Successfully'));
    }catch(error: any){
        response.status(400).json(newErrorResponse(error));
    }
}
