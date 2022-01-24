import Sequelize from 'sequelize'
import Models from '.';

export default (sequelize: Sequelize.Sequelize) => {
    class Model extends Sequelize.Model {}
    Model.init({
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
        }
    }, {
        sequelize,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: 'project'});
    return Model 
}

