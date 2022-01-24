import Sequelize from 'sequelize';

export default (sequelize: Sequelize.Sequelize) => {
    class Model extends Sequelize.Model {}
    Model.init({
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
        modelName: 'quiz_question'});
    return Model 
}