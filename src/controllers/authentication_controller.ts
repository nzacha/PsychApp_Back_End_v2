import express from "express";
import Models from '../models'
import { newErrorResponse, newResponse } from "../config/response";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from "../../app";

export async function authenticateUser(request: express.Request, response: express.Response){
    try{
        const {email, password} = request.body;
        if(!email || !password){
            return response.status(200).json(newErrorResponse('Missing information on user login'))
        }
        let user = await Models.schema.User.findOne({where: {email: email}});
        if(user == null){
            return response.status(200).json(newErrorResponse('Email not found'));    
        }
        
        let hash = crypto.pbkdf2Sync(password, user.password_salt, 1000, 16, `sha512`).toString(`hex`);
        if(hash != user.password_hash){
            return response.status(200).json(newErrorResponse('Password missmatch'));    
        }
        user = await Models.schema.User.findOne({where: {email: email}, attributes: {exclude: ['password_hash', 'password_salt', 'token']}});
        if(user){
            var token = jwt.sign({user: user}, SECRET_KEY, {
                expiresIn: process.env.NODE_ENV == 'production' ? "2h" : "24h"
            });
            user = await user.update({token: token});

            response.status(200).json(newResponse(user, 'Authentication Successful'));
        }
    }catch(error: any){
        response.status(400).json(newErrorResponse(error));
    }
}

export async function validateToken(request: express.Request, response: express.Response){
    try{
        const {token} = request.body;
        if(!token){
            return response.status(400).json(newErrorResponse('Missing information on token validation'))
        }
        const data = jwt.verify(token, SECRET_KEY);
        response.status(200).json(newResponse(data, 'Token Validated Successfully'));
    }catch(error: any){
        if(error.name && error.name == 'TokenExpiredError'){
            response.status(401).json(newErrorResponse(error));
        }else{
            response.status(400).json(newErrorResponse(error));
        }
    }
}

export async function registerUser(request: express.Request, response: express.Response){
    try{
        const {email, password, ...rest} = request.body;
        if(!email || !password){
            return response.status(400).json(newErrorResponse('Missing information on register user'))
        }
        const salt = crypto.randomBytes(16).toString('hex');
        const user = await Models.schema.User.create({...rest, email: email, password_hash: crypto.pbkdf2Sync(password, salt, 1000, 16, `sha512`).toString(`hex`), password_salt: salt});
        response.status(200).json(newResponse(user, 'Register Successful'));
    }catch(error: any){
        response.status(400).json(newErrorResponse(error));
    }
}
