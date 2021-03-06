import Sequelize from 'sequelize'
import { ModelEnum, TableNamesEnum } from '../config/models';

export class Project_User_Link extends Sequelize.Model {
    declare project_id: number;
    declare user_id: number;
    
    declare createdAt: Date;
    declare updatedAt: Date;
}
export default (sequelize: Sequelize.Sequelize) => {
    Project_User_Link.init({
        project_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        user_id:{
            type: Sequelize.INTEGER,
            primaryKey: true,    
        },
        can_edit: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
    }, {
        sequelize,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: TableNamesEnum[ModelEnum.Project_User_Link]}); //'project_user_link'
    return Project_User_Link 
}

