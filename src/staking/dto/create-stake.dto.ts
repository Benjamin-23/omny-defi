import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateStakeDto {
  @IsNotEmpty()
  @IsString()
  poolId: Types.ObjectId;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  walletAddress: string;
}
