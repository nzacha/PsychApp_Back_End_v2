import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './src/models/db_config';
import models from './src/models';
import crypto from 'crypto';

export const SECRET_KEY = process.env.SECRET_KEY || 'secret_key'; 
export const FIRST_BOOT = process.env.FORCE_DB_SYNC === 'true'; 

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
async function syncSequalize(force: boolean){
    if(force){console.log('Forcing Database to Sync...')}
    await models.sequelize.sync({force: force}) //, alter: true
}

async function testFn(){
    //user 1 - project director
    var salt = crypto.randomBytes(16).toString('hex');
    await models.User.create({user_id: 1, email: 'zicolas3@gmail.com', first_name: 'Nicolas', last_name: 'Zachariou', is_super_user: true, is_verified: true, is_active: true, password_hash: crypto.pbkdf2Sync('12345678', salt, 1000, 16, `sha512`).toString(`hex`), password_salt: salt});
    //project 1
    await models.Project.create({project_id: 1, name: 'Test Project', description: 'This is a project created for testing purposes only', director_id: 1})
        await models.Quiz.create({quiz_id: 1, name: 'Quiz 1', description: 'This is the first quiz', project_id: 1})
            await models.Quiz_Section.create({section_id: 1, name:'loving yourself', description: 'This is the first section', quiz_id: 1})
                await models.Quiz_Question.create({question_id: 1, type: 'Text', alingment: 'Horizontal', question: 'How well are you?', section_id: 1})
                    await models.Question_Option.create({question_option: 1, question_id: 1, option: 'opt 1'})
                    await models.Question_Option.create({question_option: 2, question_id: 1, option: 'opt 2'})
                await models.Quiz_Question.create({question_id: 5, type: 'Text', question: 'What is your name??', section_id: 1})
                await models.Quiz_Question.create({question_id: 6, type: 'Slider', question: 'How much is it raining?', section_id: 1})
                await models.Quiz_Question.create({question_id: 7, type: 'Slider', question: 'How many levels are there??', section_id: 1})
                    await models.Question_Option.create({question_option: 3, question_id: 7, option: 'few'})
                    await models.Question_Option.create({question_option: 4, question_id: 7, option: ''})
                    await models.Question_Option.create({question_option: 5, question_id: 7, option: ''})
                    await models.Question_Option.create({question_option: 6, question_id: 7, option: ''})
                    await models.Question_Option.create({question_option: 7, question_id: 7, option: 'a lot!'})
                
            await models.Quiz_Section.create({section_id: 4, name:'true happiness', description: 'This is the second section', quiz_id: 1})
            
        await models.Quiz.create({quiz_id: 2, name: 'Quiz 2', description: 'This is the second quiz', project_id: 1})
            await models.Quiz_Section.create({section_id: 2, description: 'This is the section with id 2', quiz_id: 2})
            await models.Quiz_Question.create({question_id: 2, type: 'Text', question: 'How are you?', section_id: 2})
    await (await models.Project.findOne({where: {project_id: 1}})).update({active_quiz_id: 1});
    
    //project 2
    await models.Project.create({project_id: 2, name: 'Project 2', description: 'This is the description of the 2nd project', director_id: 1})
        await models.Quiz.create({quiz_id: 3, name: 'Quiz 3', description: 'This is the first quiz', project_id: 2})
            await models.Quiz_Section.create({section_id: 3, description: 'This is the 3rd section', quiz_id: 3})
            await models.Quiz_Question.create({question_id: 3, type: 'Text', question: 'How are you?', section_id: 3})  
            await models.Quiz_Question.create({question_id: 4, type: 'Text', question: 'How are you?', section_id: 3})     
    await (await models.Project.findOne({where: {project_id: 2}})).update({active_quiz_id: 3});
    
    //link project 1, user 1 as director
    await models.Project_User_Link.create({project_id: 1, user_id: 1, can_edit: true})
    //link project 2, user 1 as director
    await models.Project_User_Link.create({project_id: 2, user_id: 1, can_edit: false})
    
    //project 3
    await models.Project.create({project_id: 3, name: 'Project 3', description: 'Describe project 3', director_id: 1})
    //user 2 - Second user
    await models.User.create({user_id: 2, email: 'admin@mail.com', first_name: 'Admin', last_name: 'User', is_verified: true, is_active: true, password_hash: crypto.pbkdf2Sync('12345678', salt, 1000, 16, `sha512`).toString(`hex`), password_salt: salt});
    //link project 3, user 2 as director
    await models.Project_User_Link.create({project_id: 3, user_id: 2, can_edit: true})
    
    //user 3 - Dummy user
    await models.User.create({user_id: 5, email: 'test@mail.com', first_name: 'Dummy', last_name: 'User', is_verified: true, is_active: true, password_hash: crypto.pbkdf2Sync('12345678', salt, 1000, 16, `sha512`).toString(`hex`), password_salt: salt});
    //link project 2, user 3 as guest
    await models.Project_User_Link.create({project_id: 2, user_id: 5, can_edit: true})
    
    //participants
    await models.Project_Participant.create({authentication_code: 'a0c3', project_id: '1'})
    await models.Quiz_Question_Answer.create({answer_id: 1, answer: 'thats just how i feel', question_id: 1, participant_id: 1})

    await models.Project_Participant.create({authentication_code: 'a0c4', project_id: '1'})
    await models.Project_Participant.create({authentication_code: 'a0c5', project_id: '1'})
    await models.Project_Participant.create({authentication_code: 'a0c6', project_id: '2'})
}

async function configureDB(force: boolean, test: boolean){
    await syncSequalize(force)
    //if tables were truncated add static items
    if(test){
        await testFn();
    }
}

const port = process.env.API_PORT
db.connect(async (err) => {
    if (err) {
        console.log('Failed to open a SQL Database connection.', err.stack);
        process.exit(1);
    }else{
        await configureDB(FIRST_BOOT, false)
        console.log(FIRST_BOOT);
        
        app.listen(port, () => {
            console.log(`App is listening at http://localhost:${port}`);
        });
    }
});