import { Model } from 'mongoose';
export declare class PaymentsService {
    private paymentModel;
    constructor(paymentModel: Model<any>);
    create(session: any): Promise<any>;
    findAll(): Promise<any[]>;
    findById(id: string): Promise<any[]>;
}
