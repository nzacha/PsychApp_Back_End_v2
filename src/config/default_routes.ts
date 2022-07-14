import { enumToArray } from "../utils/arrayUtils";
import { IActionMethod } from "./action_methods";
import { ModelEnum, ModelNamesEnum } from "./models";
import _ from "lodash";

const allMethods = enumToArray(IActionMethod);
const fetchMethods = [IActionMethod.FETCH_ALL, IActionMethod.FETCH_ONE];
const manipulationMethods = [IActionMethod.INSERT, IActionMethod.UPDATE, IActionMethod.DELETE];
const createDelete = [IActionMethod.INSERT, IActionMethod.DELETE]

const defaultRoutes: Array<{
    path: string,
    model: ModelEnum, 
    actions: IActionMethod[],
    requireVerification: boolean,
}> = [];
var unset = true;
/*
 * Default routes are routes that do all the basic data munipulation funcitonalities:
 * FETCH ALL, FETCH ONE, INSERT, CREATE, DELETE
 */
export const getDefaultRoutes = () => {
    if(unset){
        defaultRoutes.push({path: `/${ModelNamesEnum[ModelEnum.Alert]}`, model: ModelEnum.Alert, actions: [IActionMethod.FETCH_ALL, IActionMethod.UPDATE, IActionMethod.DELETE], requireVerification: true});
        defaultRoutes.push({path: `/${ModelNamesEnum[ModelEnum.Chat_Room]}`, model: ModelEnum.Chat_Room, actions: [IActionMethod.UPDATE, IActionMethod.DELETE], requireVerification: true});
        
        
        //custom fetch routes defined
        defaultRoutes.push({path: `/${ModelNamesEnum[ModelEnum.Project]}`, model: ModelEnum.Project, actions: [IActionMethod.UPDATE, IActionMethod.DELETE], requireVerification: true});
        defaultRoutes.push({path: `/${ModelNamesEnum[ModelEnum.Quiz]}`, model: ModelEnum.Quiz, actions: [IActionMethod.UPDATE, IActionMethod.DELETE], requireVerification: true});
        defaultRoutes.push({path: `/${ModelNamesEnum[ModelEnum.Quiz_Section]}`, model: ModelEnum.Quiz_Section, actions: manipulationMethods, requireVerification: true});
        
        defaultRoutes.push({path: `/${ModelNamesEnum[ModelEnum.Project_Participant]}`, model: ModelEnum.Project_Participant, 
            actions: [IActionMethod.FETCH_ALL, IActionMethod.FETCH_ONE, IActionMethod.DELETE], requireVerification: true});

        //no custom routes defined
        defaultRoutes.push({path: `/${ModelNamesEnum[ModelEnum.User]}`, model: ModelEnum.User, actions: [IActionMethod.DELETE], requireVerification: true});
        defaultRoutes.push({path: `/${ModelNamesEnum[ModelEnum.Quiz_Question]}`, model: ModelEnum.Quiz_Question, actions: manipulationMethods, requireVerification: true});
        defaultRoutes.push({path: `/${ModelNamesEnum[ModelEnum.Question_Option]}`, model: ModelEnum.Question_Option, actions: allMethods, requireVerification: true});
        defaultRoutes.push({path: `/${ModelNamesEnum[ModelEnum.Quiz_Question_Answer]}`, model: ModelEnum.Quiz_Question_Answer, actions: allMethods, requireVerification: true});
        
        //create - delete only
        defaultRoutes.push({path: `/${ModelNamesEnum[ModelEnum.Project_User_Link]}`, model: ModelEnum.Project_User_Link, actions: allMethods, requireVerification: true});
        unset=false;
    }
    return defaultRoutes;
}