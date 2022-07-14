import Sequelize from 'sequelize'
import { ModelEnum, TableNamesEnum } from '../config/models';

export class Project extends Sequelize.Model {
    declare project_id: number;
    declare name: string;
    declare description: string;
    declare director_id: number;
    declare active_quiz_id: number;
    declare study_length: number;
    declare tests_per_day: number;
    declare tests_time_interval: number;
    declare allow_individual_times: boolean;
    declare allow_user_termination: boolean;
    declare download_link: string;
    
    declare getUsers: Function;
}
export default (sequelize: Sequelize.Sequelize) => {
    Project.init({
        project_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            defaultValue: 'This is the project description.'
        },
        director_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        active_quiz_id: {
            type: Sequelize.INTEGER,
        },
        study_length: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        tests_per_day: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        tests_time_interval: {
            type: Sequelize.INTEGER, 
            defaultValue: 1   
        },
        allow_individual_times: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        allow_user_termination: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        automatic_termination: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        download_link: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
    }, {
        sequelize,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: TableNamesEnum[ModelEnum.Project]}); //'project'
    return Project 
}

