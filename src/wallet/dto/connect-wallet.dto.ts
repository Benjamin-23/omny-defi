import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ConnectWalletDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  chainId: number;

  @IsNotEmpty()
  @IsString()
  walletType: string;
}
