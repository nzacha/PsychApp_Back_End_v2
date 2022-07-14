import Sequelize from 'sequelize'
import { ModelEnum, TableNamesEnum } from '../config/models';

export class Chat_Room_User_Link extends Sequelize.Model {
    declare chat_room_id: number;
    declare user_id: number;
    
    declare createdAt: Date;
    declare updatedAt: Date;
}
export default (sequelize: Sequelize.Sequelize) => {
    Chat_Room_User_Link.init({
        chat_room_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        user_id:{
            type: Sequelize.INTEGER,
            primaryKey: true,    
        },
    }, {
        sequelize,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: TableNamesEnum[ModelEnum.Chat_Room_User_Link]}); //'chat_room_user_link'
    return Chat_Room_User_Link 
}

