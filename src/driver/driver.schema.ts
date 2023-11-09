import * as mongoose from 'mongoose';


export const DriverSchema = new mongoose.Schema({
    email: String, id: String,
    name: String,
    nid: Number,
    license: Number,
    dob: String,
    experience: Number,
    password: String,
});
