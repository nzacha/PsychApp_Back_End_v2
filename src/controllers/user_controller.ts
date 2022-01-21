import express from 'express'
import Models from '../models'
import { ERROR_OCCURRED, newDetailedResponse, newErrorResponse, newResponse } from  '../config/response'
import crypto from 'crypto';
import { Model } from 'sequelize/types';
import { sendMail } from '../config/email';
import { off } from 'process';

export async function createUser(request: express.Request, response: express.Response){
    try{
        const {email, ...rest} = request.body;
        if(!email){
            return response.status(400).json(newErrorResponse('Missing information on register user'))
        }
        const password = crypto.randomBytes(4).toString('hex')
        const salt = crypto.randomBytes(16).toString('hex');
        const user = await Models.User.create({...rest, email: email, password_hash: crypto.pbkdf2Sync(password, salt, 1000, 16, `sha512`).toString(`hex`), password_salt: salt});
        if(user){
            sendMail(email, 'PsychApp Registration', undefined, `<h1>Registration to PsychApp</h1><h2>Welcome ${user.first_name} ${user.last_name}!</h2><p>Your password is: <b>${password}</b></p><p>use the following link to acces the page: <a href="${process.env.WEB_HOST}">${process.env.WEB_HOST}</a></p>`);
            const retVal = await Models.User.findOne({where: {user_id: user.user_id}, attributes: {exclude: ['password_hash', 'password_salt', 'tolen']}})
            response.status(200).json(newResponse(retVal, 'New User Created Successfully'));
        }else
            response.status(400).json(newErrorResponse(ERROR_OCCURRED));
    }catch(error: any){
        response.status(400).json(newErrorResponse(error));
    }
}

export async function updateUser(request: express.Request, response: express.Response){
    try{
        const {id} = request.params;
        const {password, ...rest} = request.body;
        if(!id){
            return response.status(400).json(newErrorResponse('Missing information on user update'))
        }
        let user = await Models.User.findOne({where: {user_id: id}});
        if(user){
            let data = rest;
            if(password){
                const salt = crypto.randomBytes(16).toString('hex');
                const password_hash = crypto.pbkdf2Sync(password, salt, 1000, 16, `sha512`).toString(`hex`);
                data = { ...data, password_hash: password_hash, password_salt: salt}
            }
            await user.update({...data});
        }

        user = await Models.User.findOne({where: {user_id: id}, attributes: {exclude: ['password_hash', 'password_salt', 'token']}});    
        if(user){
            response.status(200).json(newResponse(user, 'New User Created Successfully'));
        }else
            response.status(400).json(newErrorResponse(ERROR_OCCURRED));
    }catch(error: any){
        response.status(400).json(newErrorResponse(error));
    }
}