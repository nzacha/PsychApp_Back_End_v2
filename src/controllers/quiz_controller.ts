import express from 'express'
import Models from '../models'
import { ERROR_OCCURRED, newDetailedResponse, newErrorResponse, newResponse } from  '../config/response'

export async function listQuizzesByProject(request: express.Request, response: express.Response){
    try{
        const project_id = request.params.project_id;
        if(!project_id){
            response.status(404).json(newErrorResponse(ERROR_OCCURRED));
            return;
        }

        const quizzes = await Models.schema.Quiz.findAll({where: {project_id: project_id}, include: [{model: Models.schema.Quiz_Section, include: [{model: Models.schema.Quiz_Question, include: [{model: Models.schema.Question_Option, order: [[Models.schema.Question_Option, 'question_option_id', 'ASC']]}]}], order: [[Models.schema.Quiz_Question, 'question_id', 'ASC']]}]});
        response.status(200).json(newDetailedResponse(request.params, request.body, quizzes, 'Quizzes Fetched Successfully'));
    }catch(error: any){
        response.status(400).json(newErrorResponse(error));
    }
}

export async function createQuiz(request: express.Request, response: express.Response){
    try{
        const {project_id, ...body} = request.body.project_id;
        if(!project_id){
            response.status(404).json(newErrorResponse(ERROR_OCCURRED));
            return;
        }

        const quiz = await Models.schema.Quiz.create({project_id: project_id, ...body});
        const project = await Models.schema.Project.findOne({where: {project_id: project_id}});
        if(project) {
            if(!project.active_quiz_id) await project.update({active_quiz_id: quiz.quiz_id});
            response.status(200).json(newDetailedResponse(request.params, request.body, quiz, 'Quizz Created Successfully'));
        }else{
            response.status(400).json(newErrorResponse(ERROR_OCCURRED));
        }
    }catch(error: any){
    }
}
