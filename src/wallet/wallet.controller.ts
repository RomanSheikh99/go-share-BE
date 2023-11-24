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

  @Post()
  create(@Body() createWalletDto: CreateWalletDto): Promise<any> {
    return this.walletService.create(createWalletDto);
  }

  @Patch('updateBalance')
  updateBalance(@Body() updateBalanceDto: UpdateBalanceDto): Promise<any> {
    return this.walletService.updateBalance(updateBalanceDto);
  }

  @Get('/:userId')
  findOneByUserId(@Param('userId') userId: string): Promise<any> {
    return this.walletService.findOneByUserId(userId);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<any> {
    return this.walletService.delete(id);
  }
}
