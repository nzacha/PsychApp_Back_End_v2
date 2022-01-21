import Sequelize from 'sequelize';

export default (sequelize: Sequelize.Sequelize) => {
    class Model extends Sequelize.Model {}
    Model.init({
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
        modelName: 'question_option'});
    return Model 
}