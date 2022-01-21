import express from 'express'
import Models from '../models'
import { ERROR_OCCURRED, newDetailedResponse, newErrorResponse, newResponse } from  '../config/response'

export async function updateAllProjectLinks(request: express.Request, response: express.Response){
    try{
        const project_id = request.params.project_id;
        if(!project_id){
            response.status(404).json(newErrorResponse(ERROR_OCCURRED));
            return;
        }
        const new_projects = request.body;
        if(!new_projects){
            response.status(404).json(newErrorResponse(ERROR_OCCURRED));
            return;
        }
        
        //destroy project links of given project id
        await Models.Project_User_Link.destroy({
            where: {
              project_id: project_id
            }
        });

        //bulk create links from body
        const result = await Models.Project_User_Link.bulkCreate(new_projects);
        response.status(200).json(newDetailedResponse(request.params, request.body, result, 'Projects Linked Successfully'));
    }catch(error: any){
        response.status(400).json(newErrorResponse(error));
    }
}
