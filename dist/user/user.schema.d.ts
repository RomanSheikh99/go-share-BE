import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    email?: string;
    id?: string;
    name?: string;
    password?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    email?: string;
    id?: string;
    name?: string;
    password?: string;
}>> & mongoose.FlatRecord<{
    email?: string;
    id?: string;
    name?: string;
    password?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
