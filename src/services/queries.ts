import Models from '../models';

export async function getUsersByProject(project_id: number): Promise<number[]>{
    const project = await Models.schema.Project.findOne({where: {project_id: project_id}});
    if(project){
        return (await project.getUsers() || []).map((user:any) => user.user_id);
    }else {
        return new Promise(resolve => resolve([]));
    }
}