import Sequelize from 'sequelize'
import { ModelEnum, TableNamesEnum } from '../config/models';

export class User extends Sequelize.Model {
    declare user_id: number;
    declare email: string;
    declare first_name: string;
    declare last_name: string;
    declare phone: string;
    declare is_super_user: boolean;
    declare is_verified: boolean;
    declare is_active: boolean;
    declare password_hash: string;
    declare password_salt: string;
    declare token: string
    declare avatar_url: string;
    
    declare createdAt: Date;
    declare updatedAt: Date;
    
    declare getProjects: Function;
    declare getChatRooms: Function;
    declare getChatMessages: Function;
}
    
export default (sequelize: Sequelize.Sequelize) => {
    User.init({
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {            
            type: Sequelize.STRING,
            defaultValue: '',
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
        },
        avatar_url: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        last_online: {
            type: Sequelize.DATE,
            allowNull: true,
        }
    }, {
        sequelize,
        indexes: [{ unique: true, fields: ["email"] }],
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: TableNamesEnum[ModelEnum.User]}); //'user'
    return User 
}
