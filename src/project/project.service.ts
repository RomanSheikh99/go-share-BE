import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Project } from './project.interface';
import { ProjectDTO } from './project.dto';
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
import { PaymentsRecive } from 'src/payments/payments.interface';
import { PaymentsService } from 'src/payments/payments.service';

@Injectable()
export class ProjectService {

    private stripeSecretKey = 'sk_test_51O7yKJLqOtoHOmj3wMGzRlElM4FduYF5ZFG6avif79QuvLaOoL77AHq0jTNzefNG3v9lGXKWDLSCTUFbFjH422qW00Bferr78A'
    private redirectBaseUrl = 'http://localhost:49733/';

    constructor(
        @Inject('PROJECT_MODEL')
        private projectModel: Model<Project>,
        private paymentService: PaymentsService
    ) { }

    async create(project: ProjectDTO): Promise<Project> {
        try {
            const session = await this.createStripeSession(project);
            const payment = await this.paymentService.create({ ...session, userID: project.user.sub })
            project.projectId = uuidv4();
            project.userId = project.user.sub
            project.payUrl = session.url;
            project.payId = session.id;
            project.bids = [{ price: (project.totalCost / 100) * 85, driverId: 'admin', driverName: "admin" }]
            const newProject = new this.projectModel(project);
            return await newProject.save();
        } catch (error) {
            return error
        }
    }


    async findAll(): Promise<Project[]> {
        try {
            return await this.projectModel.find();
        } catch (error) {
            return error
        }
    }

    async findOpenProject(): Promise<Project[]> {
        try {
            return await this.projectModel.find({status: "Open"});
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

    async findDriverProject(id: string): Promise<Project[]> {
        try {
            return this.projectModel.find({ driverId: id })
        } catch (error) {
            return error
        }
    }


    async addBids(id: string, price: number, driverId: string, driverName: string): Promise<Project> {
        try {
            const project: any = await this.projectModel.findOne({ projectId: id })
            if (project) {
                project.bids.push({ price, driverId, driverName });
                return await project.save();
            } else {
                return null;
            }
        } catch (error) {
            return error
        }
    }

    async checkBids(): Promise<void> {
        const projects: any = await this.projectModel.find({ status: 'Open' })
        const dis = 1000 * 60 * 3;
        for(let project of projects){
            const {bids} = project
            const time = bids[1]?.time;
            if(Date.now() - time > dis){
                project.status = 'closed'
                project.driverId = bids[bids.length-1].driverId
                project.driverName = bids[bids.length-1].driverName
                project.userBack = (project.totalCost - bids[bids.length-1].price) / 2;
                project.driverCost = bids[bids.length-1].price
                project.save();
            }
        }
    }


    private async createStripeSession(project: ProjectDTO): Promise<PaymentsRecive> {
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

        return session;
    }


}
