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
exports.DriverService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let DriverService = class DriverService {
    constructor(driverModel) {
        this.driverModel = driverModel;
    }
    async create(driver) {
        try {
            const newDriver = new this.driverModel(driver);
            newDriver.id = Math.random() * 10000000 + "sldk";
            newDriver.dob = driver.birth;
            newDriver.experience = driver.exp;
            newDriver.license = driver.dl;
            return await newDriver.save();
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findOne(email) {
        try {
            return this.driverModel.findOne({ email: email });
        }
        catch (error) {
            return error;
        }
    }
    async findOneById(sub) {
        return this.driverModel.findOne({ id: sub }).select('name id email');
    }
};
exports.DriverService = DriverService;
exports.DriverService = DriverService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DRIVER_MODEL')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], DriverService);
function uuidv4() {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=driver.service.js.map