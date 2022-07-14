import Sequelize from 'sequelize'
import { ModelEnum, TableNamesEnum } from '../config/models';

export class Project_Participant extends Sequelize.Model {
    declare participant_id: number;
    declare authentication_code: string;
    declare name: string;
    declare project_id: number;
    declare token: string;
    declare progress: number;
    declare is_active: boolean;
    declare deactivation_reason: string;
    
    declare createdAt: Date;
    declare updatedAt: Date;
}
export default (sequelize: Sequelize.Sequelize) => {
    Project_Participant.init({
        participant_id:{
            type: Sequelize.INTEGER,
            primaryKey: true,    
            autoIncrement: true
        },
        authentication_code:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        name:{
            type: Sequelize.STRING,
            defaultValue: '',
        },
        project_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        token: {
            type: Sequelize.TEXT,
        },
        progress: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        deactivation_reason:{
            type: Sequelize.STRING,
        },
    }, {
        sequelize,
        indexes: [{ unique: true, fields: ["authentication_code"] }],
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: TableNamesEnum[ModelEnum.Project_Participant]}); //'project_participant'
    return Project_Participant 
}

