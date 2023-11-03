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
    async post(@Body() project: ProjectDTO): Promise<{url: String}> {
      try {
        const res = await this.projects.create(project)
        console.log({url: res.payUrl})
        return {url: res.payUrl};
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
