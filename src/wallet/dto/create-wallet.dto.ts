import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ChainType } from '../schemas/wallet.schema';

export class CreateWalletDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEnum(ChainType)
  chainType: ChainType;

  @IsString()
  @IsNotEmpty()
  user: string;
}
