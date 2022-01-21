import { IActionMethod } from "./action_methods";
import { ModelEnum, ModelNamesEnum } from "./models";
import Models from '../models';
import _ from "lodash";
import { IQueryOptions } from "./auto_controller";
import Sequelize from 'sequelize';
import { HTTP_METHOD } from "./http_method";

export interface ICustomRoute{
    path: string;
    model: ModelEnum;
    routes: Array<{
        action: IActionMethod.FETCH_ALL | IActionMethod.FETCH_ONE, 
        options?: IQueryOptions
    }>
}
const customRoutes: ICustomRoute[] = [];
var unset = true
/*
 * Custom Routes are basic fetch routes that retrieve defined data with associations
 */
export const getCustomRoutes= () => {
    if(unset){
        customRoutes.push({path: `/${ModelNamesEnum.Project}`, model: ModelEnum.Project, routes: [
            {action: IActionMethod.FETCH_ALL, options: {include: [{model: Models.User, as: 'director'}, {model: Models.Quiz, include: [{model: Models.Quiz_Section, include: [{model: Models.Quiz_Question}]}]}]}},
            {action: IActionMethod.FETCH_ONE, options: {include: [{model: Models.User, as: 'director'}, {model: Models.Quiz, include: [{model: Models.Quiz_Section, include: [{model: Models.Quiz_Question}]}]}]}},
        ]})
        
        customRoutes.push({path: `/${ModelNamesEnum.Quiz}`, model: ModelEnum.Quiz, routes: [
            {action: IActionMethod.FETCH_ALL, options: {include: [{model: Models.Quiz_Section, include: [{model: Models.Quiz_Question, include: Models.Question_Option}]}]}},
            {action: IActionMethod.FETCH_ONE, options: {include: [{model: Models.Quiz_Section, include: [{model: Models.Quiz_Question, include: Models.Question_Option, order: [[Models.Question_Option, 'question_option_id', 'ASC']]}], order: [[Models.Quiz_Question, 'question_id', 'ASC']]}]}},
        ]})
        
        customRoutes.push({path: `/${ModelNamesEnum.Quiz_Section}`, model: ModelEnum.Quiz_Section, routes: [
            {action: IActionMethod.FETCH_ALL, options: {include: [{model: Models.Quiz_Question, include: Models.Question_Option}]}},
            {action: IActionMethod.FETCH_ONE, options: {include: [{model: Models.Quiz_Question, include: Models.Question_Option}]}},
        ]})
        
        customRoutes.push({path: `/${ModelNamesEnum.Quiz_Question}`, model: ModelEnum.Quiz_Question, routes: [
            {action: IActionMethod.FETCH_ALL, options: {include: Models.Question_Option}},
            {action: IActionMethod.FETCH_ONE, options: {include: Models.Question_Option}},
        ]})
        
        
        customRoutes.push({path: `/${ModelNamesEnum.User}`, model: ModelEnum.User, routes: [
            {action: IActionMethod.FETCH_ALL, options: {attributes: {exclude: ['password_hash', 'password_salt', 'token']}}},
            {action: IActionMethod.FETCH_ONE, options: {attributes: {exclude: ['password_hash', 'password_salt', 'token']}}},
        ]})
        
        unset = true;
    }
    return customRoutes;
}