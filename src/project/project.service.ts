import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Project } from './project.interface';
import { ProjectDTO } from './project.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProjectService {
    constructor(
        @Inject('PROJECT_MODEL')
        private projectModel: Model<Project>,
    ) { }

    async create(project: any): Promise<any> {
        try {
            const newProject = new this.projectModel(project);
            newProject.projectId = uuidv4();
            return await newProject.save();
        } catch (error) {
            return error
        }
    }


    async findAll(): Promise<Project[]> {
        try {
            return this.projectModel.find();
        } catch (error) {
            return error
        }
    }

    async findById(id: string): Promise<Project[]> {
        try {
            return this.projectModel.find({ userId: id })
        } catch (error) {
            return error
        }
    }


    // async findOne(id: string): Promise<Project> {
    //     try {
    //         return this.projectModel.findOne({projectId: id});
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    // async updateOne(id: string, updatedUser: CreateUserDTO): Promise<User> {
    //     return this.userModel.findOneAndUpdate({id: id},updatedUser, {new: true}).select('name age id email');
    // }

    // async deleteOne(id: string): Promise<User> {
    //     return this.userModel.findOneAndDelete({id: id});
    // }
}
