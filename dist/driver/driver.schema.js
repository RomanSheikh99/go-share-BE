"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverSchema = void 0;
const mongoose = require("mongoose");
exports.DriverSchema = new mongoose.Schema({
    email: String, id: String,
    name: String,
    nid: Number,
    license: Number,
    dob: String,
    experience: Number,
    password: String,
});
//# sourceMappingURL=driver.schema.js.map