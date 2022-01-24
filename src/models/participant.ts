import Sequelize from 'sequelize'

export default (sequelize: Sequelize.Sequelize) => {
    class Model extends Sequelize.Model {}
    Model.init({
        participant_id:{
            type: Sequelize.INTEGER,
            primaryKey: true,    
            autoIncrement: true
        },
        authentication_code:{
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        name:{
            type: Sequelize.STRING,
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
        }
    }, {
        sequelize,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: 'project_participant'});
    return Model 
}

