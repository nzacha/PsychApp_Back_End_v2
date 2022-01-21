import express, { Router } from "express";
import { IActionMethod } from "./action_methods";
import { ModelEnum } from "./models";
import _ from "lodash";
import { createDefaultController, IQueryOptions } from "./auto_controller";
import { HTTP_METHOD } from "./http_method";
import { verifyToken } from "../middleware/verifyToken";

export const createDefaultRoute = (router: Router, path: string, model: ModelEnum, action: IActionMethod, options?: IQueryOptions)=>{
    const _path = path.toLowerCase();
    console.log(`\t> Routing Model: [${model}] and Action: [${IActionMethod[action]}] at ${_path} ${options ? 'with options' : ''}`)
    switch(action){
        case IActionMethod.FETCH_ALL:
            router.get(_path, verifyToken, createDefaultController(model, action, options));
            break;
        case IActionMethod.FETCH_ONE:
            router.get(_path + '/:id', verifyToken, createDefaultController(model, action, options));
            break;
        case IActionMethod.INSERT:
            router.put(_path, verifyToken, createDefaultController(model, action, options));
            break;
        case IActionMethod.UPDATE:
            router.patch(_path + '/:id', verifyToken, createDefaultController(model, action, options));
            break;
        case IActionMethod.DELETE:
            router.delete(_path + '/:id', verifyToken, createDefaultController(model, action, options));
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
