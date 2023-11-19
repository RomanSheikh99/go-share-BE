"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSchema = void 0;
const mongoose = require("mongoose");
exports.PaymentSchema = new mongoose.Schema({
    userID: String,
    id: String,
    amount_subtotal: Number,
    amount_total: Number,
    created: Number,
    currency: String,
    status: String,
    url: String,
});
//# sourceMappingURL=payments.schema.js.map