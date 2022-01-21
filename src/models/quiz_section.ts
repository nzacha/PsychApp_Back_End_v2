import Sequelize from 'sequelize'

export default (sequelize: Sequelize.Sequelize) => {
    class Model extends Sequelize.Model {}
    Model.init({
        section_id: {
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
        quiz_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'quiz_section'});
    return Model 
}

