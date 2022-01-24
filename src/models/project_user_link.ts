import Sequelize from 'sequelize'

export default (sequelize: Sequelize.Sequelize) => {
    class Model extends Sequelize.Model {}
    Model.init({
        project_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        user_id:{
            type: Sequelize.INTEGER,
            primaryKey: true,    
        },
        can_edit: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
    }, {
        sequelize,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: 'project_user_link'});
    return Model 
}

