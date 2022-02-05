import { Sequelize } from 'sequelize'
import { connectionDetails } from './db_config';

const db:any = {};

const sequelize = new Sequelize(connectionDetails.database, connectionDetails.user, connectionDetails.password, {
  dialect: 'mysql',
  host: connectionDetails.host,
  port: connectionDetails.port
})

db.sequelize = sequelize;

import User from './user'
db.User = User(sequelize)

// import Role from './role'
// db.Role = Role(sequelize)

import Project from './project'
db.Project = Project(sequelize)

import Quiz from './quiz'
db.Quiz = Quiz(sequelize)

import Quiz_Section from './quiz_section'
db.Quiz_Section = Quiz_Section(sequelize)

import Quiz_Question from './quiz_question'
db.Quiz_Question = Quiz_Question(sequelize)

import Question_Option from './quiz_question_option'
db.Question_Option = Question_Option(sequelize)

import Quiz_Question_Answer from './quiz_question_answer'
db.Quiz_Question_Answer = Quiz_Question_Answer(sequelize)

import Project_User_Link from './project_user_link'
db.Project_User_Link = Project_User_Link(sequelize)

import Project_Participant from './participant'
db.Project_Participant = Project_Participant(sequelize)

db.Project.hasOne(db.Quiz, {foreignKey: 'project_id'})
db.Quiz.hasOne(db.Project, {foreignKey: 'active_quiz_id', as: 'active_quiz', constraints: false})

db.Quiz.hasMany(db.Quiz_Section, {foreignKey: 'quiz_id'})
db.Quiz_Section.hasMany(db.Quiz_Question, {foreignKey: 'section_id'})
db.Quiz_Question.hasMany(db.Question_Option, {foreignKey: 'question_id'})

// db.Role.hasMany(db.User, {foreignKey: 'role_id'})

db.Project.belongsTo(db.User, {foreignKey: 'director_id', as: 'director'})
db.Project.belongsToMany(db.User, {through: db.Project_User_Link, sourceKey: 'project_id', foreignKey: 'project_id'})
db.User.belongsToMany(db.Project, {through: db.Project_User_Link, sourceKey: 'user_id', foreignKey: 'user_id'})

//Project Participant
db.Project_Participant.belongsTo(db.Project, {foreignKey: 'project_id'})

//Quiz Answers 
db.Quiz_Question.hasMany(db.Quiz_Question_Answer, {foreignKey: 'question_id'})

db.Quiz_Question_Answer.belongsTo(db.Quiz_Question, {foreignKey: 'question_id'})
db.Quiz_Question_Answer.belongsTo(db.Project_Participant, {foreignKey: 'participant_id'})
db.Project_Participant.hasMany(db.Quiz_Question_Answer, {foreignKey: 'question_id', onDelete: 'cascade', hooks: true})

export default db;