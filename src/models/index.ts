import { Sequelize } from 'sequelize'
import { connectionDetails } from './db_config';
import { ModelEnum } from '../config/models';

//schema
import User_Model, { User } from './user'
import Project_Model, { Project } from './project'
import Quiz_Model, { Quiz } from './quiz'
import Quiz_Section_Model, { Quiz_Section } from './quiz_section'
import Quiz_Question_Model, { Quiz_Question } from './quiz_question'
import Question_Option_Model, { Question_Option } from './quiz_question_option'
import Quiz_Question_Answer_Model, { Quiz_Answer } from './quiz_question_answer'
import Project_User_Link_Model, { Project_User_Link } from './project_user_link'
import Project_Participant_Model, { Project_Participant } from './participant'
import Alert_Model, { Alert } from './alert'
import Chat_Room_Model, { Chat_Room } from './chat_room'
import Chat_Message_Model, { Chat_Message } from './chat_message'
import Chat_Room_User_Link_Model, { Chat_Room_User_Link } from './chat_room_user_link'

const sequelize = new Sequelize(connectionDetails.database, connectionDetails.user, connectionDetails.password, {
  dialect: 'mysql',
  host: connectionDetails.host,
  port: connectionDetails.port,
  logging: false
})

const ModelTypes = {
  "User": User,
  "Project": Project,
  "Project_Participant": Project_Participant,
  "Quiz": Quiz,
  "Quiz_Section": Quiz_Section,
  "Quiz_Question": Quiz_Question,
  "Quiz_Question_Answer": Quiz_Answer,
  "Question_Option": Question_Option,
  "Project_User_Link": Project_User_Link,
  "Alert": Alert,
  "Chat_Room": Chat_Room,
  "Chat_Message": Chat_Message,
  "Chat_Room_User_Link": Chat_Room_User_Link,
}
type ModelTypeKeys = keyof typeof ModelEnum;
const db: {
  sequelize: Sequelize;
  schema: {
    [x in ModelTypeKeys]: typeof ModelTypes[x];
  }
} = {
  sequelize: sequelize,
  schema: {
    User: User_Model(sequelize),
    Project: Project_Model(sequelize),
    Quiz: Quiz_Model(sequelize),
    Quiz_Section: Quiz_Section_Model(sequelize),
    Quiz_Question: Quiz_Question_Model(sequelize),
    Question_Option: Question_Option_Model(sequelize),
    Quiz_Question_Answer: Quiz_Question_Answer_Model(sequelize),
    Project_User_Link: Project_User_Link_Model(sequelize),
    Project_Participant: Project_Participant_Model(sequelize),
    Alert: Alert_Model(sequelize),
    Chat_Room: Chat_Room_Model(sequelize),
    Chat_Message: Chat_Message_Model(sequelize),
    Chat_Room_User_Link: Chat_Room_User_Link_Model(sequelize),
  }
};


//relations
db.schema.Project.hasOne(db.schema.Quiz, {foreignKey: 'project_id'});
db.schema.Quiz.hasOne(db.schema.Project, {foreignKey: 'active_quiz_id', as: 'active_quiz', constraints: false});

db.schema.Quiz.hasMany(db.schema.Quiz_Section, {foreignKey: 'quiz_id'});
db.schema.Quiz_Section.hasMany(db.schema.Quiz_Question, {foreignKey: 'section_id'});
db.schema.Quiz_Question.hasMany(db.schema.Question_Option, {foreignKey: 'question_id'});

// db.Role.hasMany(db.User, {foreignKey: 'role_id'})
db.schema.Project.belongsTo(db.schema.User, {foreignKey: 'director_id', as: 'director'});
db.schema.Project.belongsToMany(db.schema.User, {through: {model: db.schema.Project_User_Link}, sourceKey: 'project_id', foreignKey: 'project_id', as: {singular: 'user', plural: 'users'}});
db.schema.User.belongsToMany(db.schema.Project, {through: {model: db.schema.Project_User_Link}, sourceKey: 'user_id', foreignKey: 'user_id', as: {singular: 'project', plural: 'projects'}});

//Project Participant
db.schema.Project_Participant.belongsTo(db.schema.Project, {foreignKey: 'project_id'});

//Quiz Answers 
db.schema.Quiz_Question.hasMany(db.schema.Quiz_Question_Answer, {foreignKey: 'question_id'});

db.schema.Quiz_Question_Answer.belongsTo(db.schema.Quiz_Question, {foreignKey: 'question_id'});
db.schema.Quiz_Question_Answer.belongsTo(db.schema.Project_Participant, {foreignKey: 'participant_id', onDelete: 'cascade', hooks: true});
db.schema.Project_Participant.hasMany(db.schema.Quiz_Question_Answer, {foreignKey: 'question_id'});

//Alerts
db.schema.User.hasMany(db.schema.Alert, {foreignKey: 'user_id'});
db.schema.Alert.belongsTo(db.schema.User, {foreignKey: 'user_id'});

//Chat
db.schema.User.hasMany(db.schema.Chat_Message, {foreignKey: 'user_id', as: 'chatMessages'});
db.schema.Chat_Message.belongsTo(db.schema.User, {foreignKey: 'user_id'});

db.schema.Chat_Room.hasMany(db.schema.Chat_Message, {foreignKey: 'chat_room_id', as: 'messages'});
db.schema.Chat_Message.belongsTo(db.schema.Chat_Room, {foreignKey: 'chat_room_id'});

//Chat Room User Link
db.schema.Chat_Room.belongsToMany(db.schema.User, {through: {model: db.schema.Chat_Room_User_Link}, sourceKey: 'chat_room_id', foreignKey: 'chat_room_id', as: {singular: 'member', plural: 'members'}});
db.schema.User.belongsToMany(db.schema.Chat_Room, {through: {model: db.schema.Chat_Room_User_Link}, sourceKey: 'user_id', foreignKey: 'user_id', as: {singular: 'chatRoom', plural: 'chatRooms'}});

export default db;