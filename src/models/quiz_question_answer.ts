import Sequelize from 'sequelize';

export default (sequelize: Sequelize.Sequelize) => {
    class Model extends Sequelize.Model {}
    Model.init({
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
            type: Sequelize.DATE,
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
        modelName: 'quiz_answer'});
    return Model 
}