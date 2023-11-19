import * as mongoose from 'mongoose';
export declare const PaymentSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    id?: string;
    userID?: string;
    status?: string;
    url?: string;
    amount_subtotal?: number;
    amount_total?: number;
    created?: number;
    currency?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    id?: string;
    userID?: string;
    status?: string;
    url?: string;
    amount_subtotal?: number;
    amount_total?: number;
    created?: number;
    currency?: string;
}>> & mongoose.FlatRecord<{
    id?: string;
    userID?: string;
    status?: string;
    url?: string;
    amount_subtotal?: number;
    amount_total?: number;
    created?: number;
    currency?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
