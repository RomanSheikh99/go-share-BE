"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const stripe_1 = require("stripe");
const payments_service_1 = require("../payments/payments.service");
let ProjectService = class ProjectService {
    constructor(projectModel, paymentService) {
        this.projectModel = projectModel;
        this.paymentService = paymentService;
        this.stripeSecretKey = 'sk_test_51O7yKJLqOtoHOmj3Vam2htJEFULUxk3JlscVDpZrfvhBXjs9a37evE4MOsN5INno32fUYpnGV7F4F18b1tzjgiQh00m0hgXkk8';
        this.redirectBaseUrl = 'http://localhost:4200/';
    }
    async create(project) {
        try {
            const session = await this.createStripeSession(project);
            const payment = await this.paymentService.create({ ...session, userID: project.user.sub });
            project.projectId = (0, uuid_1.v4)();
            project.userId = project.user.sub;
            project.payUrl = session.url;
            project.payId = session.id;
            project.bids = [{ price: (project.totalCost / 100) * 85, driverId: 'admin', driverName: "admin" }];
            const newProject = new this.projectModel(project);
            return await newProject.save();
        }
        catch (error) {
            return error;
        }
    }
    async findAll() {
        try {
            return await this.projectModel.find();
        }
        catch (error) {
            return error;
        }
    }
    async findOpenProject() {
        try {
            return await this.projectModel.find({ status: "Open" });
        }
        catch (error) {
            return error;
        }
    }
    async findById(id) {
        try {
            return this.projectModel.find({ userId: id });
        }
        catch (error) {
            return error;
        }
    }
    async findDriverProject(id) {
        try {
            return this.projectModel.find({ driverId: id });
        }
        catch (error) {
            return error;
        }
    }
    async addBids(id, price, driverId, driverName) {
        try {
            const project = await this.projectModel.findOne({ projectId: id });
            if (project) {
                project.bids.push({ price, driverId, driverName });
                return await project.save();
            }
            else {
                return null;
            }
        }
        catch (error) {
            return error;
        }
    }
    async checkBids() {
        const projects = await this.projectModel.find({ status: 'Open' });
        const dis = 1000 * 60 * 3;
        for (let project of projects) {
            const { bids } = project;
            const time = bids[1]?.time;
            if (Date.now() - time > dis) {
                project.status = 'closed';
                project.driverId = bids[bids.length - 1].driverId;
                project.driverName = bids[bids.length - 1].driverName;
                project.userBack = (project.totalCost - bids[bids.length - 1].price) / 2;
                project.driverCost = bids[bids.length - 1].price;
                project.save();
            }
        }
    }
    async createStripeSession(project) {
        const stripeInstance = new stripe_1.default(this.stripeSecretKey);
        const projectName = 'Order ' + project.vehcle.title + ' from ' + project.startLocation + " to " + project.endLocation;
        const price = Math.ceil(project.totalCost * 100);
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
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PROJECT_MODEL')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        payments_service_1.PaymentsService])
], ProjectService);
//# sourceMappingURL=project.service.js.map