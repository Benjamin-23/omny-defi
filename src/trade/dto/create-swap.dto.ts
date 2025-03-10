import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateSwapDto {
  @IsNotEmpty()
  @IsString()
  fromToken: string;

  @IsNotEmpty()
  @IsString()
  toToken: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  walletAddress: string;
}
