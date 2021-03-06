import express from "express";
import { IActionMethod } from "./action_methods";
import { ModelEnum, ModelNamesEnum, TableNamesEnum } from "./models";
import Models from '../models';
import { newDetailedResponse, newErrorResponse, newResponse } from "./response";
import _ from "lodash";
import Sequelize, { Model } from 'sequelize';

export const createDefaultController = (model: ModelEnum, action: IActionMethod, options?: Sequelize.FindOptions) => {
    return async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const optionsWhere = options?.where || null;
        const bodyWhere = request.body.where ? request.body.where : null;
        
        const paramID = {
            [`${ModelNamesEnum[model]}_id`.toLowerCase()]: request.params.id
        };
        const where = (optionsWhere || bodyWhere) ? {...optionsWhere, ...bodyWhere} : null;
        const include = options?.include ? options.include : null;

        try{
            let res; 
            let item;
            switch(action){
                case IActionMethod.FETCH_ALL:
                    res = await _.get(Models.schema, ModelEnum[model]).findAll({
                        ...( where ? {where: where} : {}),
                        ...( include ? {include: include} : {}),
                    })
                    break;
                case IActionMethod.FETCH_ONE:
                    res = await _.get(Models.schema, ModelEnum[model]).findOne({
                        ...options,
                        where: {
                            ...( where ? {where: where} : {}),
                            ...paramID
                        },
                        ...( include ? {include: include} : {}),
                    })
                    break;
                case IActionMethod.INSERT:
                    res = await _.get(Models.schema, ModelEnum[model]).create({
                        ...options,
                        ...request.body
                    }); 
                    res = res.dataValues;
                    break;
                case IActionMethod.UPDATE:
                    item = await _.get(Models.schema, ModelEnum[model]).findOne({
                        ...options,
                        where: {
                            ...paramID,
                        },
                    }) 
                    res = await item.update({...request.body})
                    break;
                case IActionMethod.DELETE:
                    item = await _.get(Models.schema, ModelEnum[model]).findOne({
                        ...options,
                        where: {
                            ...where, 
                            ...paramID,
                        },
                    }) 
                    res = await item.destroy()
                    break;
            }

            console.log(`[${IActionMethod[action]} - ${TableNamesEnum[model]}]: ${JSON.stringify(res)}`)
            response.status(200).json(newDetailedResponse(request.params, request.body, res, `${IActionMethod[action]} - ${ModelEnum[model]} Successful`));
            response.end();
            // next();
        } catch (e: any) {
            console.log(`error: ${e}`);
            response.status(400).json(newErrorResponse(e))
            // next(e);
        } 
    }
}