import Sequelize from 'sequelize'
import { ModelEnum, TableNamesEnum } from '../config/models';

export class Chat_Message extends Sequelize.Model {
    declare chat_message_id: number;
    declare chat_room_id: number;
    declare user_id: number | 'system';
    declare text: string;
    
    declare createdAt: Date;
    declare updatedAt: Date;
}
 
export default (sequelize: Sequelize.Sequelize) => {
    Chat_Message.init({
        chat_message_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        chat_room_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        text: {
            type: Sequelize.STRING,
            defaultValue: ''
        }
    }, {
        sequelize,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: TableNamesEnum[ModelEnum.Chat_Message]
    }); //'chat_message'
    return Chat_Message 
}