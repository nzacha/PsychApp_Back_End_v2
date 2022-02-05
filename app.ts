import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './src/models/db_config';
import models from './src/models';
import crypto from 'crypto';

export const SECRET_KEY = process.env.SECRET_KEY || 'secret_key'; 
export const FORCE_DB_SYNC = process.env.SYNC_FORCE_DB === 'true'; 
export const ALTER_DB_SYNC = process.env.SYNC_ALTER_DB === 'true'; 

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/images', express.static('images'));

app.get('/', function (req: express.Request, res: express.Response) {
    res.json({ message: 'Hello' });
});

import routes from './src/routes';
app.use(routes);

//use force to truncate tables
//use alter otherwise
async function syncSequalize(force: boolean, alter: boolean){
    if(force){console.log('Forcing Database to Sync...')}
    await models.sequelize.sync({force: force, alter: alter}) //, alter: true
}

async function configureDB(force: boolean, alter: boolean){
    await syncSequalize(force, alter)
    //if tables were truncated add static items
}

const port = process.env.API_PORT
db.connect(async (err) => {
    if (err) {
        console.log('Failed to open a SQL Database connection.', err.stack);
        process.exit(1);
    }else{
        await configureDB(FORCE_DB_SYNC, ALTER_DB_SYNC);
        console.log(FORCE_DB_SYNC, ALTER_DB_SYNC);
        
        app.listen(port, () => {
            console.log(`App is listening at http://localhost:${port}`);
        });
    }
});