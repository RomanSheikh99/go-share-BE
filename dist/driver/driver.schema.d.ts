import * as mongoose from 'mongoose';
export declare const DriverSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    email?: string;
    id?: string;
    name?: string;
    password?: string;
    nid?: number;
    license?: number;
    dob?: string;
    experience?: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    email?: string;
    id?: string;
    name?: string;
    password?: string;
    nid?: number;
    license?: number;
    dob?: string;
    experience?: number;
}>> & mongoose.FlatRecord<{
    email?: string;
    id?: string;
    name?: string;
    password?: string;
    nid?: number;
    license?: number;
    dob?: string;
    experience?: number;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
