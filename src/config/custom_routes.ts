import { IActionMethod } from "./action_methods";
import { ModelEnum, ModelNamesEnum } from "./models";
import Models from '../models';
import _ from "lodash";
import Sequelize  from "sequelize";

export interface ICustomRoute{
    path: string;
    model: ModelEnum;
    routes: Array<{
        action: IActionMethod.FETCH_ALL | IActionMethod.FETCH_ONE, 
        requireVerification: boolean,
        options?: Sequelize.FindOptions,
    }>
}
const customRoutes: ICustomRoute[] = [];
var unset = true
/*
 * Custom Routes are basic fetch routes that retrieve defined data with associations
 */
export const getCustomRoutes= () => {
    if(unset){
        customRoutes.push({path: `/${ModelNamesEnum[ModelEnum.Project]}`, model: ModelEnum.Project, routes: [
            {action: IActionMethod.FETCH_ALL, requireVerification: true, options: {include: [{model: Models.schema.User, as: 'director'}, {model: Models.schema.Quiz, include: [{model: Models.schema.Quiz_Section, include: [{model: Models.schema.Quiz_Question}]}]}]}},
            {action: IActionMethod.FETCH_ONE, requireVerification: true, options: {include: [{model: Models.schema.User, as: 'director'}, {model: Models.schema.Quiz, include: [{model: Models.schema.Quiz_Section, include: [{model: Models.schema.Quiz_Question}]}]}]}},
        ]})
        
        customRoutes.push({path: `/${ModelNamesEnum[ModelEnum.Quiz]}`, model: ModelEnum.Quiz, routes: [
            {action: IActionMethod.FETCH_ALL, requireVerification: true, options: {include: [{model: Models.schema.Quiz_Section, include: [{model: Models.schema.Quiz_Question, include: [{model: Models.schema.Question_Option}]}]}]}},
            {action: IActionMethod.FETCH_ONE, requireVerification: true, options: {include: [
                {model: Models.schema.Quiz_Section, include: [
                    {model: Models.schema.Quiz_Question, include: [
                        {model: Models.schema.Question_Option, order: [[Models.schema.Question_Option, 'question_option_id', 'ASC']]}
                    ]}
                ], order: [[Models.schema.Quiz_Question, 'question_id', 'ASC']]}
            ]}},
        ]})
        
        customRoutes.push({path: `/${ModelNamesEnum[ModelEnum.Quiz_Section]}`, model: ModelEnum.Quiz_Section, routes: [
            {action: IActionMethod.FETCH_ALL, requireVerification: true, options: {include: [{model: Models.schema.Quiz_Question, include: [{model: Models.schema.Question_Option}]}]}},
            {action: IActionMethod.FETCH_ONE, requireVerification: true, options: {include: [{model: Models.schema.Quiz_Question, include: [{model: Models.schema.Question_Option}]}]}},
        ]})
        
        customRoutes.push({path: `/${ModelNamesEnum[ModelEnum.Quiz_Question]}`, model: ModelEnum.Quiz_Question, routes: [
            {action: IActionMethod.FETCH_ALL, requireVerification: true, options: {include: {model: Models.schema.Question_Option}}},
            {action: IActionMethod.FETCH_ONE, requireVerification: true, options: {include: {model: Models.schema.Question_Option}}},
        ]})
        
        customRoutes.push({path: `/${ModelNamesEnum[ModelEnum.User]}`, model: ModelEnum.User, routes: [
            {action: IActionMethod.FETCH_ALL, requireVerification: true, options: {attributes: {exclude: ['password_hash', 'password_salt', 'token']}}},
            {action: IActionMethod.FETCH_ONE, requireVerification: true, options: {attributes: {exclude: ['password_hash', 'password_salt', 'token']}}},
        ]})
        
        unset = true;
    }
    return customRoutes;
}