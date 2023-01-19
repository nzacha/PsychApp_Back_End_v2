export enum ModelEnum{
    User = 1,
    // Role  = 'Role',
    Project,
    Project_Participant,
    Quiz,
    Quiz_Section,
    Quiz_Question,
    Quiz_Question_Answer,
    Question_Option,
    Project_User_Link,
    Alert,
    Chat_Room,
    Chat_Message,
    Chat_Room_User_Link
}

export const ModelNamesEnum = {
    // [ModelEnum.Role]: 'role',
    [ModelEnum.Project]: 'project',
    [ModelEnum.Project_Participant]: 'participant',
    [ModelEnum.User]: 'user',
    [ModelEnum.Quiz]: 'quiz',
    [ModelEnum.Quiz_Section]: 'section',
    [ModelEnum.Quiz_Question]: 'question',
    [ModelEnum.Quiz_Question_Answer]: 'answer',
    [ModelEnum.Question_Option]: 'question_option',
    [ModelEnum.Project_User_Link]: 'project_user_link',
    [ModelEnum.Alert]: 'alert',
    [ModelEnum.Chat_Room]: 'room',
    [ModelEnum.Chat_Message]: 'message',
    [ModelEnum.Chat_Room_User_Link]: 'chat_room_user_link'
}

export const TableNamesEnum = {
    // [ModelEnum.Role]: 'role',
    [ModelEnum.Project]: 'project',
    [ModelEnum.Project_Participant]: 'project_participant',
    [ModelEnum.User]: 'user',
    [ModelEnum.Quiz]: 'quiz',
    [ModelEnum.Quiz_Section]: 'quiz_section',
    [ModelEnum.Quiz_Question]: 'quiz_question',
    [ModelEnum.Quiz_Question_Answer]: 'quiz_answer',
    [ModelEnum.Question_Option]: 'question_option',
    [ModelEnum.Project_User_Link]: 'project_user_link',
    [ModelEnum.Alert]: 'alert',
    [ModelEnum.Chat_Room]: 'chat_room',
    [ModelEnum.Chat_Message]: 'chat_message',
    [ModelEnum.Chat_Room_User_Link]: 'chat_room_user_link'
}
