import mysql from 'mysql2';

import * as dotenv from "dotenv";
dotenv.config();

export const connectionDetails = {
    host: process.env.DB_HOST || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || '',
    port: parseInt(process.env.DB_PORT || '3306')
}
const connection = mysql.createConnection(connectionDetails)

export default connection;