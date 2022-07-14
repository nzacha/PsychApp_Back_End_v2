import Sequelize from 'sequelize'
import { ModelEnum, TableNamesEnum } from '../config/models';

export class Chat_Room extends Sequelize.Model {
    declare chat_room_id: number;
    declare room_name: string;
    
    declare createdAt: Date;
    declare updatedAt: Date;

    declare getMembers: Function;
    declare getMessages: Function;
}

export default (sequelize: Sequelize.Sequelize) => {
    Chat_Room.init({
        chat_room_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        room_name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: TableNamesEnum[ModelEnum.Chat_Room]
    }); //'chat_room'
    return Chat_Room 
}
