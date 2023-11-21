import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { CreateUserDTO } from './DTOs/user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async create(userDto: CreateUserDTO): Promise<User> {
    console.log('here');
    const user = new this.userModel(userDto);
    user.id = uuidv4();
    return await user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('name age id email');
  }

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email: email });
  }

  async findOneById(sub: string): Promise<User> {
    return this.userModel.findOne({ id: sub });
  }

  async updateOne(id: string, updatedUser: CreateUserDTO): Promise<User> {
    return this.userModel
      .findOneAndUpdate({ id: id }, updatedUser, { new: true })
      .select('name age id email');
  }

  async deleteOne(id: string): Promise<User> {
    return this.userModel.findOneAndDelete({ id: id });
  }
}
