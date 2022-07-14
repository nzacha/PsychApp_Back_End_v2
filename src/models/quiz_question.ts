import Sequelize from 'sequelize';
import { ModelEnum, TableNamesEnum } from '../config/models';

export class Quiz_Question extends Sequelize.Model {
    declare question_id: number;
    declare type: string;
    declare alignment: string;
    declare question: string;
    declare request_reason: boolean;
    declare section_id: number;
    
    declare createdAt: Date;
    declare updatedAt: Date;
}
export default (sequelize: Sequelize.Sequelize) => {
    Quiz_Question.init({
        question_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: Sequelize.STRING,            
            defaultValue: "Text",
            validate:{
                isIn: [["Text", "Slider"]],
            },
            allowNull: false
        },
        alignment: {
            type: Sequelize.STRING,            
            defaultValue: "Horizontal",
            validate:{
                isIn: [["Horizontal", "Vertical"]],
            },
            allowNull: false
        },
        question:{
            type: Sequelize.STRING,
            defaultValue: 'This is a question.',
            allowNull: false
        },
        request_reason:{
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        section_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: TableNamesEnum[ModelEnum.Quiz_Question]}); //'quiz_question'
    return Quiz_Question 
}