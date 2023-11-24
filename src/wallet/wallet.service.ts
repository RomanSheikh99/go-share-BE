import { CreateWalletDto } from './DTOs/createWallet.dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet, WalletDocument } from './Schemas/wallet.schema';
import { UpdateBalanceDto } from './DTOs/updateBalance.dto';

@Injectable()
export class WalletService {
  // constructor(@InjectModel(Wallet.name) private walletModel: Model<Wallet>) {}
  constructor(
    @InjectModel('Wallet') private walletModel: Model<WalletDocument>,
  ) {}

  async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
    try {
      const createdWallet = new this.walletModel(createWalletDto);
      return createdWallet.save();
    } catch (error) {
      if (error.code === 11000) {
        // MongoDB duplicate key error code
        throw new ConflictException('A wallet for this user already exists');
      }
      throw new InternalServerErrorException(
        'An error occurred while creating wallet',
      );
    }
  }

  async updateBalance(updateBalanceDto: UpdateBalanceDto): Promise<Wallet> {
    const { id, balance } = updateBalanceDto;
    try {
      return this.walletModel.findByIdAndUpdate(id, { balance }, { new: true });
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while updating the balance',
      );
    }
  }

  async findOneByUserId(userId: string): Promise<Wallet> {
    try {
      return this.walletModel.findOne({ userId });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string): Promise<Wallet> {
    try {
      return this.walletModel.findByIdAndDelete(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<Wallet[]> {
    return this.walletModel.find();
  }
}
