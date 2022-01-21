import express from "express";
import { IActionMethod } from "./action_methods";
import { ModelEnum, ModelNamesEnum } from "./models";
import Models from '../models';
import { newDetailedResponse, newErrorResponse, newResponse } from "./response";
import _ from "lodash";
import Sequelize from 'sequelize';
import { HTTP_METHOD } from "./http_method";

export interface IIncludeOption{
    model: ModelEnum; //Sequelize.Model;
    as?: string;
    include?: IIncludeOption[] | IIncludeOption; 
    order?: IOrderOptions[][];
}

export interface IAttributeOptions{
    exclude: string[];
}

export interface IOrderOptions{
    model: Sequelize.Model;
    attribute: string;
    order: 'ASC' | 'DESC';
}

export interface IQueryOptions{
    include?: IIncludeOption[] | IIncludeOption;
    where?: any;
    attributes?: IAttributeOptions;
}

export const createDefaultController = (model: ModelEnum, action: IActionMethod, options?: IQueryOptions) => {
    return async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const bodyWhere = request.body.where ? request.body.where : null;
        const optionsWhere = options?.where ? options.where : null;
        
        const paramID = {
            [`${ModelNamesEnum[model]}_id`.toLowerCase()]: request.params.id
        };
        const where = optionsWhere | bodyWhere ? {...optionsWhere, ...bodyWhere} : null;

        const include = options?.include ? options.include : null;
        // console.log({
        //     ...( where ? {where: where} : {}),
        //     ...( include ? {include: include} : {}),
        // })
        // console.log(paramID);
        
        try{
            let res; 
            let item;
            switch(action){
                case IActionMethod.FETCH_ALL:
                    res = await _.get(Models, model).findAll({
                        ...options,
                        ...( where ? {where: where} : {}),
                        ...( include ? {include: include} : {}),
                    })
                    break;
                case IActionMethod.FETCH_ONE:
                    res = await _.get(Models, model).findOne({
                        ...options,
                        where: {
                            ...( where ? {where: where} : {}),
                            ...paramID
                        },
                        ...( include ? {include: include} : {}),
                    })
                    break;
                case IActionMethod.INSERT:
                    res = await _.get(Models, model).create({
                        ...options,
                        ...request.body
                    }); 
                    res = res.dataValues;
                    break;
                case IActionMethod.UPDATE:
                    item = await _.get(Models, model).findOne({
                        ...options,
                        where: {
                            ...paramID,
                        },
                    }) 
                    res = await item.update({...request.body})
                    break;
                case IActionMethod.DELETE:
                    item = await _.get(Models, model).findOne({
                        ...options,
                        where: {
                            ...where, 
                            ...paramID,
                        },
                    }) 
                    res = await item.destroy()
                    break;
            }

            console.log(`[${action}]: ${JSON.stringify(res)}`)
            response.status(200).json(newDetailedResponse(request.params, request.body, res, `${IActionMethod[action]} - ${model} Successful`));
            response.end();
            // next();
        } catch (e: any) {
            console.log(`error: ${e}`);
            response.status(400).json(newErrorResponse(e))
            // next(e);
        } 
    }
}