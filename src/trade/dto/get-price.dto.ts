import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class GetPriceDto {
  @IsNotEmpty()
  @IsString()
  fromToken: string;

  @IsNotEmpty()
  @IsString()
  toToken: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
