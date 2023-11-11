import { Inject, Injectable } from '@nestjs/common';
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
      return error;
    }
  }

  async findAll(): Promise<any[]> {
    try {
      return this.paymentModel.find();
    } catch (error) {
      return error;
    }
  }

  async findById(id: string): Promise<any[]> {
    try {
      return this.paymentModel.find({ userID: id });
    } catch (error) {
      return error;
    }
  }
}
