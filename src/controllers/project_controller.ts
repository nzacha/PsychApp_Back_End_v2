import express from 'express'
import Models from '../models'
import { ERROR_OCCURRED, newDetailedResponse, newErrorResponse, newResponse } from  '../config/response'
import { Model } from 'sequelize/types';
import quiz_question from '../models/quiz_question';

export async function listProjectsByUserId(request: express.Request, response: express.Response){
    try{
        const user_id = request.params.user_id;
        if(!user_id){
            response.status(404).json(newErrorResponse(ERROR_OCCURRED));
            return;
        }
        
        const user = await Models.User.findOne({where: {user_id: user_id}})
        if(!user){
            response.status(404).json(newErrorResponse('User Not Found'));
            return;
        }

        const projects = await user.getProjects({include: [{model: Models.User, as: 'director'}, {model: Models.Quiz, include: [{model: Models.Quiz_Section, include: [{model: Models.Quiz_Question}]}]}]});
        response.status(200).json(newDetailedResponse(request.params, request.body, projects, 'Projects Fetched Successfully'));
    }catch(error: any){
        response.status(400).json(newErrorResponse(error));
    }
}

export async function fetchActiveQuiz(request: express.Request, response: express.Response){
    try{
        const project_id = request.params.project_id;
        if(!project_id){
            response.status(404).json(newErrorResponse(ERROR_OCCURRED));
            return;
        }
        
        const project = await Models.Project.findOne({where: {project_id: project_id}})
        if(!project){
            response.status(404).json(newErrorResponse('Project Not Found'));
            return;
        }
        const quiz_id = project.active_quiz_id;
        if(!quiz_id){
            response.status(404).json(newErrorResponse('No Active Quiz'));
            return;
        }
        const quiz = await Models.Quiz.findOne({
            where: {quiz_id: project.active_quiz_id}, 
            include: [{
                model: Models.Quiz_Section, 
                include: [{
                    model: Models.Quiz_Question, 
                    include: {
                        model: Models.Question_Option, 
                    }
                }],
            }]
        });
        quiz.quiz_sections.sort((a: any, b: any) => {return a.section_id - b.section_id});
        for(let quiz_section of quiz.quiz_sections){
            quiz_section.quiz_questions.sort((a: any, b: any) => {return a.question_id - b.question_id});
            for(let quiz_question of quiz_section.quiz_questions){
                quiz_question.question_options.sort((a: any, b: any) => {return a.option_id - b.option_id});
            }
        }
        console.log(JSON.stringify(quiz.dataValues));
        // const projects = await Models.Project.getProjects({include: [{model: Models.User, as: 'director'}, {model: Models.Quiz, include: [{model: Models.Quiz_Section, include: [{model: Models.Quiz_Question}]}]}]});
        response.status(200).json(newDetailedResponse(request.params, request.body, quiz, 'Project Active Quiz Fetched Successfully'));
    }catch(error: any){
        response.status(400).json(newErrorResponse(error));
    }
}

export async function createProject(request: express.Request, response: express.Response){
    try{
        const {name, director_id} = request.body;
        if(!name || !director_id){
            response.status(404).json(newErrorResponse(ERROR_OCCURRED));
            return;
        }
        
        const project = await Models.Project.create({name: name, director_id: director_id});
        if(!project){
            response.status(404).json(newErrorResponse('Error While Creating Project'));
            return;
        }
        await Models.Project_User_Link.create({user_id: director_id, project_id: project.project_id});
        const quiz = await Models.Quiz.create({project_id: project.project_id, name: 'New Quiz'});
        if(!project.active_quiz_id) await project.update({active_quiz_id: quiz.quiz_id});
        response.status(200).json(newDetailedResponse(request.params, request.body, project, 'Project Active Quiz Fetched Successfully'));
    }catch(error: any){
        response.status(400).json(newErrorResponse(error));
    }
}
