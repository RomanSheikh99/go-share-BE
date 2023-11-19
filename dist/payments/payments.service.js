"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let PaymentsService = class PaymentsService {
    constructor(paymentModel) {
        this.paymentModel = paymentModel;
    }
    async create(session) {
        try {
            const pay = new this.paymentModel(session);
            return await pay.save();
        }
        catch (error) {
            return error;
        }
    }
    async findAll() {
        try {
            return this.paymentModel.find();
        }
        catch (error) {
            return error;
        }
    }
    async findById(id) {
        try {
            return this.paymentModel.find({ userID: id });
        }
        catch (error) {
            return error;
        }
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PAYMENT_MODEL')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map