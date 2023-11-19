import { ProjectService } from './project.service';
import { Project } from './project.interface';
import { ProjectDTO } from './project.dto';
export declare class ProjectController {
    private projects;
    constructor(projects: ProjectService);
    post(project: ProjectDTO): Promise<{
        url: String;
    }>;
    getProjects(): Promise<Project[]>;
    getDriverProjects(id: string): Promise<Project[]>;
    getUserProjects(id: string): Promise<Project[]>;
    checkBids(): void;
    update(id: string, body: any): Promise<Project>;
}
