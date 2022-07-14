import express from 'express'
import Models from '../models'
import { ERROR_OCCURRED, newErrorResponse, newResponse } from  '../config/response'

export async function listQuizSectionsByQuizId(request: express.Request, response: express.Response){
    try{
        const quiz_id = request.params.quiz_id;
        if(!quiz_id){
            return response.status(404).json(newErrorResponse(ERROR_OCCURRED));
        }

        const quiz_sections = await Models.schema.Quiz_Section.findAll({where: {quiz_id: quiz_id}, include: [{model: Models.schema.Quiz_Question}]})
        response.status(200).json(newResponse({response: quiz_sections, request: {params: request.params, body: request.body}}, 'Quiz Sections Fetched Successfully'));
    }catch(error: any){
        response.status(400).json(newErrorResponse(error));
    }
}
