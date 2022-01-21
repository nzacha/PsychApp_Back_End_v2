export enum ModelEnum{
    User  = 'User',
    // Role  = 'Role',
    Project = 'Project',
    Project_Participant = 'Project_Participant',
    Quiz = 'Quiz',
    Quiz_Section = 'Quiz_Section',
    Quiz_Question = 'Quiz_Question',
    Quiz_Question_Answer = 'Quiz_Question_Answer',
    Question_Option = 'Question_Option',
    Project_User_Link = 'Project_User_Link'
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
}
