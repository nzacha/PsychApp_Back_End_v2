import { IActionMethod } from "./action_methods";
import { ModelEnum, ModelNamesEnum } from "./models";
import Models from '../models';
import _ from "lodash";
import express from "express";
import { HTTP_METHOD } from "./http_method";
import { newErrorResponse, newResponse } from "./response";

export interface IComplexRoute{
    method: HTTP_METHOD;
    path: string;
    handler: (request: express.Request, response: express.Response) => Promise<void>; 
}
const complexRoutes: IComplexRoute[] = [];
var unset = true
// @returns an array of complex routes. Complex routes have a user defined handler / controller
export const getComplexRoutes= () => {
    if(unset){

        // complexRoutes.push({
        //     method: HTTP_METHOD.GET, 
        //     path: `/${ModelNamesEnum.Project}/list/:user_id`, 
        //     handler: async (request: express.Request, response: express.Response) => {
        //         try{
        //             const user_id = request.params.user_id;
        //             console.log(`Fetching projects of user with id: ${user_id}`);
        //             const user = await Models.User.findOne({
        //                 where: {
        //                     user_id: user_id,
        //                 }
        //             })
        //             const projects = await user.getProjects();
        //             const res = projects;
        //             console.log(`${JSON.stringify(res)}`)
        //             response.status(200).json(newResponse({response: res, request: {params: request.params, body: request.body}}));
        //             response.end();
        //         }catch(error: any){
        //             console.log(`error: ${error}`);
        //             response.status(400).json(newErrorResponse(error))
        //         }
        // }})

        unset = true;
    }
    return complexRoutes;
}