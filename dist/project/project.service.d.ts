import { Model } from 'mongoose';
import { Project } from './project.interface';
import { ProjectDTO } from './project.dto';
import { PaymentsService } from 'src/payments/payments.service';
export declare class ProjectService {
    private projectModel;
    private paymentService;
    private stripeSecretKey;
    private redirectBaseUrl;
    constructor(projectModel: Model<Project>, paymentService: PaymentsService);
    create(project: ProjectDTO): Promise<Project>;
    findAll(): Promise<Project[]>;
    findOpenProject(): Promise<Project[]>;
    findById(id: string): Promise<Project[]>;
    findDriverProject(id: string): Promise<Project[]>;
    addBids(id: string, price: number, driverId: string, driverName: string): Promise<Project>;
    checkBids(): Promise<void>;
    private createStripeSession;
}
