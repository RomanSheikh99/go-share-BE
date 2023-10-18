import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { CreateUserDTO } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<User>,
    ) { }

    async create(userDto: CreateUserDTO): Promise<User> {
        const user = new this.userModel(userDto);
        user.id = Date.now() + `${user.name.split(' ').join("@")}` + Math.random() * 100;
        return (await user.save());
    }


    async findAll(): Promise<User[]> {
        return this.userModel.find().select('name age id email');
    }

    async findOne(email: string): Promise<User> {
        return this.userModel.findOne({email: email});
    }

    async updateOne(id: string, updatedUser: CreateUserDTO): Promise<User> {
        return this.userModel.findOneAndUpdate({id: id},updatedUser, {new: true}).select('name age id email');
    }

    async deleteOne(id: string): Promise<User> {
        return this.userModel.findOneAndDelete({id: id});
    }
}
