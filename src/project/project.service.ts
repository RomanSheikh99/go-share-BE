import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Project } from './project.interface';
import { ProjectDTO } from './project.dto';
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';

@Injectable()
export class ProjectService {

    private stripeSecretKey = 'sk_test_51O7yKJLqOtoHOmj3hkVAefAUpKJvWfZ8U1CcjGyTfGykEHvWjZVLoitsmEePNhPUrIPHwNQ0rwBzHDGvuins8THK00fKWc13aC'
    private redirectBaseUrl = 'http://localhost:4200/';

    constructor(
        @Inject('PROJECT_MODEL')
        private projectModel: Model<Project>,
    ) { }

    async create(project: ProjectDTO): Promise<Project> {
        try {
            const session = await this.createStripeSession(project);
            project.projectId = uuidv4();
            project.userId = project.user.sub
            project.payUrl = session.url;
            project.payId = session.id;
            const newProject = new this.projectModel(project);
            return await newProject.save();
            ;
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


    
    private async createStripeSession(project: ProjectDTO): Promise<{id: String, url: String}> {
        const stripeInstance = new Stripe(this.stripeSecretKey);
        const projectName = 'Order ' + project.vehcle.title + ' from ' + project.startLocation + " to " + project.endLocation
        const price = Math.ceil(project.totalCost * 100)
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        unit_amount: price,
                        currency: 'usd',
                        product_data: {
                            name: projectName,
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${this.redirectBaseUrl}dashboard/projects`,
            cancel_url: `${this.redirectBaseUrl}`,
        });
        const {id, url} = session;
        return {id, url};
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
