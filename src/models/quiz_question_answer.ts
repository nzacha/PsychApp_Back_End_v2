import Sequelize from 'sequelize';
import { ModelEnum, TableNamesEnum } from '../config/models';

export class Quiz_Answer extends Sequelize.Model {
    declare answer_id: number;
    declare answer: string;
    declare index: number;
    declare date: Date;
    declare question_id: number;
    declare participant_id: number;
    
    declare createdAt: Date;
    declare updatedAt: Date;
}
export default (sequelize: Sequelize.Sequelize) => {
    Quiz_Answer.init({
        answer_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        answer: {
            type: Sequelize.STRING,
            defaultValue: '',
        },
        index:{
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        date:{
            type: Sequelize.STRING,
        },
        question_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        participant_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: TableNamesEnum[ModelEnum.Quiz_Question_Answer]}); //'quiz_answer'
    return Quiz_Answer 
}