import express, { Router } from "express";
import { IActionMethod } from "./action_methods";
import { ModelEnum } from "./models";
import _ from "lodash";
import { createDefaultController } from "./auto_controller";
import { HTTP_METHOD } from "./http_method";
import { verifyToken } from "../middleware/verifyToken";
import Sequelize, { Model } from 'sequelize';

export const createDefaultRoute = (router: Router, path: string, model: ModelEnum, action: IActionMethod, requireVerification: boolean = true, options?: Sequelize.FindOptions)=>{
    const _path = path.toLowerCase();
    console.log(`\t> Routing Model: [${model}] and Action: [${IActionMethod[action]}] at ${_path} ${options ? 'with options' : ''}`)
    switch(action){
        case IActionMethod.FETCH_ALL:
            if(requireVerification){
                router.get(_path, verifyToken, createDefaultController(model, action, options));
            }else{
                router.get(_path, createDefaultController(model, action, options));
            }
            break;
        case IActionMethod.FETCH_ONE:
            if(requireVerification){
                router.get(_path + '/:id', verifyToken, createDefaultController(model, action, options));
            }else{
                router.get(_path + '/:id', createDefaultController(model, action, options));
            }
            break;
        case IActionMethod.INSERT:
            if(requireVerification){
                router.put(_path, verifyToken, createDefaultController(model, action, options));
            }else{
                router.put(_path, createDefaultController(model, action, options));
            }
            break;
        case IActionMethod.UPDATE:
            if(requireVerification){
                router.patch(_path + '/:id', verifyToken, createDefaultController(model, action, options));
            }else{
                router.patch(_path + '/:id', createDefaultController(model, action, options));
            }
            break;
        case IActionMethod.DELETE:
            if(requireVerification){
                router.delete(_path + '/:id', verifyToken, createDefaultController(model, action, options));
            }else{
                router.delete(_path + '/:id', createDefaultController(model, action, options));
            }
            break;
    }
}

export const createCustomRoute = (
    router: Router, 
    method: HTTP_METHOD, 
    path: string, 
    handler: (request: express.Request, response: express.Response, next: express.NextFunction) => Promise<void>
) => {
    console.log(`\t> Custom Route at ${method}: ${path}`);
    switch(method){
        case HTTP_METHOD.GET:
            router.get(path, verifyToken, handler);
            break;
        case HTTP_METHOD.POST:
            router.post(path, verifyToken, handler);
            break;
        case HTTP_METHOD.PUT:
            router.put(path, verifyToken, handler);
            break;
        case HTTP_METHOD.PATCH:
            router.patch(path, verifyToken, handler);
            break;
        case HTTP_METHOD.DELETE:
            router.delete(path, verifyToken, handler);
            break;
    }
}
