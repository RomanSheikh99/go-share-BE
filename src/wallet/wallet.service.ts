import { CreateWalletDto } from './DTOs/createWallet.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from './Schemas/wallet.schema';
import { UpdateBalanceDto } from './DTOs/updateBalance.dto';

@Injectable()
export class WalletService {
  constructor(@InjectModel(Wallet.name) private walletModel: Model<Wallet>) {}

  /**
   * Creates a new wallet.
   *
   * @param createWalletDto - The data for creating the wallet.
   * @returns A promise that resolves to the created wallet.
   * @throws InternalServerErrorException if there is an error while creating the wallet.
   */
  async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
    try {
      const createdWallet = new this.walletModel(createWalletDto);
      return createdWallet.save();
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  /**
   * Updates the balance of a wallet.
   * @param updateBalanceDto - The DTO containing the wallet ID and the new balance.
   * @returns A Promise that resolves to the updated Wallet object.
   * @throws InternalServerErrorException if an error occurs while updating the balance.
   */
  async updateBalance(updateBalanceDto: UpdateBalanceDto): Promise<Wallet> {
    const { id, balance } = updateBalanceDto;
    try {
      return this.walletModel.findByIdAndUpdate(id, { balance }, { new: true });
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  /**
   * Finds a wallet by its ID.
   * @param id - The ID of the wallet to find.
   * @returns A promise that resolves to the found wallet.
   * @throws InternalServerErrorException if an error occurs while finding the wallet.
   */
  async findOne(id: string): Promise<Wallet> {
    try {
      return this.walletModel.findById(id).exec();
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  /**
   * Deletes a wallet by its ID.
   * @param id The ID of the wallet to delete.
   * @returns A promise that resolves to the deleted wallet.
   * @throws InternalServerErrorException if an error occurs while deleting the wallet.
   */
  async delete(id: string): Promise<Wallet> {
    try {
      return this.walletModel.findByIdAndDelete(id).exec();
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<Wallet[]> {
    return this.walletModel.find().exec();
  }
}
