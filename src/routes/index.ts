import express from 'express';
import { getDefaultRoutes } from '../config/default_routes';
import { ModelNamesEnum } from '../config/models';
import { getCustomRoutes } from '../config/custom_routes';
import { createCustomRoute, createDefaultRoute } from '../config/auto_router';
import _ from 'lodash';
import { getComplexRoutes } from '../config/complex_routes';

var router = express.Router();

console.log('[Info]: Creating Default Routes');
const defaultRoutes = getDefaultRoutes();
for(let route of defaultRoutes){
    console.log(`Auto-Routing ${route.model} with Default Controller:`)
    route.actions.forEach(action =>   {
        createDefaultRoute(router, route.path, route.model, action);
    })
    console.log();
}

console.log('[Info]: Creating Custom Routes');
const customRoutes = getCustomRoutes();
for (let route of customRoutes) {
    console.log(`Auto-Routing ${route.model} with Custom Controller:`)
    for (let controller of route.routes) {
        createDefaultRoute(router, route.path, route.model, controller.action, controller.options);
    };
    console.log();
};

console.log('[Info]: Creating Complex Routes');
const complexRoutes = getComplexRoutes();
for (let route of complexRoutes){
    createCustomRoute(router, route.method, route.path, route.handler)
    console.log();
}

// CUSTOM CONTROLLERS
import authentication from './authentication';
router.use('/auth', authentication);

import { verifyToken } from '../middleware/verifyToken';
import users from './users';
router.use(`/${ModelNamesEnum.User}`, users);

import projects from './projects';
router.use(`/${ModelNamesEnum.Project}`, verifyToken, projects);

import quizzes from './quizzes';
router.use(`/${ModelNamesEnum.Quiz}`, verifyToken, quizzes);

import quizSections from './quiz_sections';
router.use(`/${ModelNamesEnum.Quiz_Section}`, verifyToken, quizSections);

import participation from './participation';
router.use(`/${ModelNamesEnum.Project_Participant}`, verifyToken, participation);

import project_user_link from './project_user_link';
router.use(`/${ModelNamesEnum.Project_User_Link}`, verifyToken, project_user_link);

import answers from './answer';
router.use(`/${ModelNamesEnum.Quiz_Question_Answer}`, answers);

export default router;