import Sequelize from 'sequelize'

export default (sequelize: Sequelize.Sequelize) => {
    class Model extends Sequelize.Model {}
    Model.init({
        quiz_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        description: {
            type: Sequelize.TEXT,
            defaultValue: ''
        },
        project_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: 'quiz'});
    return Model 
}

