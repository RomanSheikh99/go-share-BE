import { Model } from 'mongoose';
import { User } from './user.interface';
import { CreateUserDTO } from './user.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    create(userDto: CreateUserDTO): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(email: string): Promise<User>;
    findOneById(sub: string): Promise<User>;
    updateOne(id: string, updatedUser: CreateUserDTO): Promise<User>;
    deleteOne(id: string): Promise<User>;
}
