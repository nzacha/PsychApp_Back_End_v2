import express from 'express';
import { getDefaultRoutes } from '../config/default_routes';
import { ModelEnum, ModelNamesEnum, TableNamesEnum } from '../config/models';
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
        createDefaultRoute(router, route.path, route.model, action, route.requireVerification);
    })
    console.log();
}

console.log('[Info]: Creating Custom Routes');
const customRoutes = getCustomRoutes();
for (let route of customRoutes) {
    console.log(`Auto-Routing ${route.model} with Custom Controller:`)
    for (let controller of route.routes) {
        createDefaultRoute(router, route.path, route.model, controller.action, controller.requireVerification, controller.options);
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
router.use(`/${ModelNamesEnum[ModelEnum.User]}`, users);

import projects from './projects';
router.use(`/${ModelNamesEnum[ModelEnum.Project]}`, verifyToken, projects);

import quizzes from './quizzes';
router.use(`/${ModelNamesEnum[ModelEnum.Quiz]}`, verifyToken, quizzes);

import quizSections from './quiz_sections';
router.use(`/${ModelNamesEnum[ModelEnum.Quiz_Section]}`, verifyToken, quizSections);

import participation from './participation';
router.use(`/${ModelNamesEnum[ModelEnum.Project_Participant]}`, verifyToken, participation);

import project_user_link from './project_user_link';
router.use(`/${ModelNamesEnum[ModelEnum.Project_User_Link]}`, verifyToken, project_user_link);

import answers from './answer';
router.use(`/${ModelNamesEnum[ModelEnum.Quiz_Question_Answer]}`, answers);

import alerts from './alerts';
router.use(`/${ModelNamesEnum[ModelEnum.Alert]}`, verifyToken, alerts);

import chat_room from './chat_room';
router.use(`/${ModelNamesEnum[ModelEnum.Chat_Room]}`, verifyToken, chat_room);

import services from './services';
router.use(`/services`, verifyToken, services);

export default router;