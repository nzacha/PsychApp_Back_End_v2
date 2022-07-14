import Sequelize from 'sequelize'
import {Optional} from 'sequelize/types'
import { ModelEnum, TableNamesEnum } from '../config/models';

export class Alert extends Sequelize.Model {
    declare alert_id: number;
    declare title: string;
    declare description: string;
    declare message: string;
    declare user_id: number;
    declare is_read: boolean;
    
    declare createdAt: Date;
    declare updatedAt: Date;
}
export default (sequelize: Sequelize.Sequelize) => {
    Alert.init({
        alert_id:{
            type: Sequelize.INTEGER,
            primaryKey: true,    
            autoIncrement: true
        },
        title:{
            type: Sequelize.STRING,
            defaultValue: ''
        },
        description:{
            type: Sequelize.STRING,
            defaultValue: ''
        },
        message:{
            type: Sequelize.STRING,
            defaultValue: ''
        },
        user_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        is_read: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        modelName: TableNamesEnum[ModelEnum.Alert]}); //'alert'
    return Alert 
}

