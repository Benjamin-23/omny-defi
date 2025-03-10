import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ConnectWalletDto } from './dto/connect-wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('connect')
  async connectWallet(@Body() connectWalletDto: ConnectWalletDto) {
    return this.walletService.connectWallet(connectWalletDto);
  }

  @Get(':address/balance')
  async getWalletBalance(@Param('address') address: string) {
    return this.walletService.getWalletBalance(address);
  }
}
