import Sequelize from 'sequelize';
import { ModelEnum, TableNamesEnum } from '../config/models';

export class Question_Option extends Sequelize.Model {
    declare question_option_id: number;
    declare option: string;
    declare question_id: number;
    
    declare createdAt: Date;
    declare updatedAt: Date;
}
export default (sequelize: Sequelize.Sequelize) => {
    Question_Option.init({
        question_option_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        option: {
            type: Sequelize.STRING,
        },
        question_id:{
            type: Sequelize.INTEGER,
        }
    }, {
        sequelize,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: TableNamesEnum[ModelEnum.Question_Option]}); //'question_option'
    return Question_Option 
}