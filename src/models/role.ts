import Sequelize from 'sequelize'

export default (sequelize: Sequelize.Sequelize) => {
    class Model extends Sequelize.Model {}
    Model.init({
        role_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        description: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
    }, {
        sequelize,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: 'role'});
    return Model 
}

