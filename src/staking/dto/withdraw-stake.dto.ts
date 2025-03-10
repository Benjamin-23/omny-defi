import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class WithdrawStakeDto {
  @IsNotEmpty()
  @IsString()
  stakeId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  walletAddress: string;
}
