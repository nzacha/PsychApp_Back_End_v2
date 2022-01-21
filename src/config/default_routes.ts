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
    actions: IActionMethod[]
}> = [];
var unset = true;
/*
 * Default routes are routes that do all the basic data munipulation funcitonalities:
 * FETCH ALL, FETCH ONE, INSERT, CREATE, DELETE
 */
export const getDefaultRoutes = () => {
    if(unset){
        //custom fetch routes defined
        defaultRoutes.push({path: `/${ModelNamesEnum.Project}`, model: ModelEnum.Project, actions: [IActionMethod.UPDATE, IActionMethod.DELETE]});
        defaultRoutes.push({path: `/${ModelNamesEnum.Quiz}`, model: ModelEnum.Quiz, actions: [IActionMethod.UPDATE, IActionMethod.DELETE]});
        defaultRoutes.push({path: `/${ModelNamesEnum.Quiz_Section}`, model: ModelEnum.Quiz_Section, actions: manipulationMethods});
        
        defaultRoutes.push({path: `/${ModelNamesEnum.Project_Participant}`, model: ModelEnum.Project_Participant, 
            actions: [IActionMethod.FETCH_ALL, IActionMethod.FETCH_ONE, IActionMethod.DELETE]});

        //no custom routes defined
        defaultRoutes.push({path: `/${ModelNamesEnum.User}`, model: ModelEnum.User, actions: [IActionMethod.DELETE]});
        defaultRoutes.push({path: `/${ModelNamesEnum.Quiz_Question}`, model: ModelEnum.Quiz_Question, actions: manipulationMethods});
        defaultRoutes.push({path: `/${ModelNamesEnum.Question_Option}`, model: ModelEnum.Question_Option, actions: allMethods});
        defaultRoutes.push({path: `/${ModelNamesEnum.Quiz_Question_Answer}`, model: ModelEnum.Quiz_Question_Answer, actions: allMethods});
        
        //create - delete only
        defaultRoutes.push({path: `/${ModelNamesEnum.Project_User_Link}`, model: ModelEnum.Project_User_Link, actions: allMethods});
        unset=false;
    }
    return defaultRoutes;
}