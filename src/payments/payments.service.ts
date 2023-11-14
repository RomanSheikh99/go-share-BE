import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { PaymentsRecive } from './payments.interface';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject('PAYMENT_MODEL')
    private paymentModel: Model<any>,
  ) {}

  async create(session: any): Promise<any> {
    try {
      const pay = new this.paymentModel(session);
      return await pay.save();
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async findAll(): Promise<any[]> {
    try {
      return this.paymentModel.find();
    } catch (error) {
      console.error(error);
      throw new NotFoundException(error.message);
    }
  }

  async findById(id: string): Promise<any[]> {
    try {
      return this.paymentModel.find({ userID: id });
    } catch (error) {
      console.error(error);
      throw new NotFoundException(error.message);
    }
  }
}
