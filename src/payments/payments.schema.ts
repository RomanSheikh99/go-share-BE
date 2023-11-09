import * as mongoose from 'mongoose';


export const PaymentSchema = new mongoose.Schema({
    userID: String,
    id: String,
    amount_subtotal: Number,
    amount_total: Number,
    created: Number,
    currency: String,
    status: String,
    url: String,
});
