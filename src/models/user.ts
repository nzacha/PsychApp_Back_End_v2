import Sequelize from 'sequelize'

export default (sequelize: Sequelize.Sequelize) => {
    class Model extends Sequelize.Model {}
    Model.init({
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {            
            type: Sequelize.STRING,
            defaultValue: '',
            unique: true
        },
        first_name: {            
            type: Sequelize.STRING,
            defaultValue: ''
        },
        last_name: {
        	type: Sequelize.STRING,
            defaultValue: ''
        },
        phone:{
            type: Sequelize.STRING,
        },
        is_super_user:{
        	type: Sequelize.BOOLEAN,
        	defaultValue: false,
        },
        is_verified: {
        	type: Sequelize.BOOLEAN,
        	defaultValue: false,
        },
        is_active: {
        	type: Sequelize.BOOLEAN,
        	defaultValue: true
        },
        password_hash: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password_salt: {
            type: Sequelize.STRING,
            allowNull: false
        },
        token: {
            type: Sequelize.TEXT,
        }
    }, {
        sequelize,
        modelName: 'user',
    });
    return Model 
}