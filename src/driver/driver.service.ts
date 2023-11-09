import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver, DriverDTO } from './driver.interface';
import { CreateUserDTO } from 'src/user/user.dto';
import { CleanPlugin } from 'webpack';


@Injectable()
export class DriverService {
    constructor(
        @Inject('DRIVER_MODEL')
        private driverModel: Model<Driver>,
    ) { }


    async create(driver: any): Promise<Driver> {
        try {
            const newDriver = new this.driverModel(driver);
            newDriver.id = Math.random() * 10000000 + "sldk"
            newDriver.dob = driver.birth;
            newDriver.experience = driver.exp;
            newDriver.license = driver.dl;
            return await newDriver.save()
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    // async findAll(): Promise<User[]> {
    //     return this.userModel.find().select('name age id email');
    // }

    async findOne(email: string): Promise<Driver> {
        try {
            return this.driverModel.findOne({email: email});
        } catch (error) {
            return error;
        }
    }

    async findOneById(sub: string): Promise<Driver> {
        return this.driverModel.findOne({id: sub}).select('name id email');
    }

    // async updateOne(id: string, updatedUser: CreateUserDTO): Promise<User> {
    //     return this.userModel.findOneAndUpdate({id: id},updatedUser, {new: true}).select('name age id email');
    // }

    // async deleteOne(id: string): Promise<User> {
    //     return this.userModel.findOneAndDelete({id: id});
    // }
}
function uuidv4(): any {
    throw new Error('Function not implemented.');
}

