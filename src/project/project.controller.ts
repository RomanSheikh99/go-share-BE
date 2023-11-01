import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.interface';
import { ProjectDTO } from './project.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('projects')
export class ProjectController {

    constructor(private projects: ProjectService) {}

    @UseGuards(AuthGuard)
    @Post()
    post(@Body() project: ProjectDTO): Promise<Project> {
      try {
        return this.projects.create(project);
      } catch (error) {
        return error;
      }
    }

    @UseGuards(AuthGuard)
    @Get()
    getProjects(): Promise<Project[]> {
      return this.projects.findAll();
    }
  
    @UseGuards(AuthGuard)
    @Get(":id")
    getUserProjects(@Param('id') id: string): Promise<Project[]> {
      return this.projects.findById(id);
    }
  
   
  
    // @Put(':id')
    // update(@Param('id') id: string, @Body() project: Project) {
    //   return this.projects.updateOne(id, project);
    // }
  
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.projects.deleteOne(id);
    // }

}
