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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const driver_service_1 = require("../driver/driver.service");
const saltOrRounds = 10;
let AuthService = class AuthService {
    constructor(usersService, driverService, jwtService) {
        this.usersService = usersService;
        this.driverService = driverService;
        this.jwtService = jwtService;
    }
    async signUp(signUpData) {
        if (signUpData.type == 2) {
            return await this.driverSignUp(signUpData);
        }
        else {
            return await this.userSignUp(signUpData);
        }
    }
    async userSignUp(signUpData) {
        try {
            const user = await this.usersService.findOne(signUpData.email);
            if (user) {
                throw new common_1.UnauthorizedException("user all ready exists");
            }
            signUpData.password = await bcrypt.hash(signUpData.password, saltOrRounds);
            const res = await this.usersService.create(signUpData);
            const { name, id } = res;
            const payload = { sub: id, username: name };
            const token = await this.jwtService.signAsync(payload);
            return { token };
        }
        catch (error) {
            return error;
        }
    }
    async driverSignUp(signUpData) {
        try {
            const user = await this.driverService.findOne(signUpData.email);
            if (user) {
                throw new common_1.UnauthorizedException("user all ready exists");
            }
            signUpData.password = await bcrypt.hash(signUpData.password, saltOrRounds);
            const res = await this.driverService.create(signUpData);
            const { name, id } = res;
            const payload = { sub: id, username: name };
            const token = await this.jwtService.signAsync(payload);
            return { token };
        }
        catch (error) {
            return error;
        }
    }
    async signIn(signInDto) {
        try {
            const user = await this.usersService.findOne(signInDto.email);
            const driver = await this.driverService.findOne(signInDto.email);
            if (!user && !driver) {
                throw new common_1.UnauthorizedException("user not find");
            }
            const password = user ? user.password : driver.password;
            const passwordsMatch = await bcrypt.compare(signInDto.password, password);
            if (!passwordsMatch) {
                throw new common_1.UnauthorizedException('Invalid password');
            }
            const { name, id } = user ? user : driver;
            const payload = { sub: id, username: name };
            const token = await this.jwtService.signAsync(payload);
            return { token };
        }
        catch (error) {
            return error;
        }
    }
    async getProfile(sub) {
        try {
            console.log(sub);
            let user = await this.usersService.findOneById(sub);
            let driver = await this.driverService.findOneById(sub);
            if (!user && !driver) {
                throw new common_1.UnauthorizedException("user not find");
            }
            const type = user ? 1 : 2;
            const { id, name, email } = user ? user : driver;
            return { id, name, email, type };
        }
        catch (error) {
            return error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, driver_service_1.DriverService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map