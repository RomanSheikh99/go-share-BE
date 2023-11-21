import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './DTOs/createWallet.dto';
import { UpdateBalanceDto } from './DTOs/updateBalance.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  /**
   * Creates a new wallet.
   * @param createWalletDto The data for creating the wallet.
   * @returns A Promise that resolves to the created wallet.
   */
  @Post()
  create(@Body() createWalletDto: CreateWalletDto): Promise<any> {
    return this.walletService.create(createWalletDto);
  }

  /**
   * Updates the balance of a wallet.
   * @param updateBalanceDto The DTO containing the updated balance information.
   * @returns A Promise that resolves to the updated balance.
   */
  @Patch('updateBalance')
  updateBalance(@Body() updateBalanceDto: UpdateBalanceDto): Promise<any> {
    return this.walletService.updateBalance(updateBalanceDto);
  }

  /**
   * Retrieves a wallet by its ID.
   * @param id The ID of the wallet to retrieve.
   * @returns A promise that resolves to the retrieved wallet.
   */
  @Get('/:id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.walletService.findOne(id);
  }

  /**
   * Deletes a wallet by its ID.
   * @param id The ID of the wallet to delete.
   * @returns A Promise that resolves to the result of the deletion.
   */
  @Delete('/:id')
  delete(@Param('id') id: string): Promise<any> {
    return this.walletService.delete(id);
  }
}
