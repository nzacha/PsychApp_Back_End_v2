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

        const quizzes = await Models.Quiz.findAll({where: {project_id: project_id}, include: [{model: Models.Quiz_Section, include: [{model: Models.Quiz_Question, include: {model: Models.Question_Option, order: [[Models.Question_Option, 'question_option_id', 'ASC']]}}], order: [[Models.Quiz_Question, 'question_id', 'ASC']]}]});
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

        const quiz = await Models.Quiz.create({project_id: project_id, ...body});
        const project = await Models.Project.findOne({where: {project_id: project_id}});
        if(!project.active_quiz_id) await project.update({active_quiz_id: quiz.quiz_id});
        response.status(200).json(newDetailedResponse(request.params, request.body, quiz, 'Quizz Created Successfully'));
    }catch(error: any){
        response.status(400).json(newErrorResponse(error));
    }
}
