import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBalanceDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  balance: number;
}
