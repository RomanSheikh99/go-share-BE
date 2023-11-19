import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private payments;
    constructor(payments: PaymentsService);
    getProjects(): Promise<any[]>;
    getUserProjects(id: string): Promise<any[]>;
}
