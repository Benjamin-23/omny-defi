import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TradeService } from './trade.service';
import { CreateSwapDto } from './dto/create-swap.dto';
import { GetPriceDto } from './dto/get-price.dto';

@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Post('swap')
  async createSwap(@Body() createSwapDto: CreateSwapDto) {
    return this.tradeService.createSwap(createSwapDto);
  }

  @Post('price')
  async getPrice(@Body() getPriceDto: GetPriceDto) {
    return this.tradeService.getPrice(getPriceDto);
  }

  @Get('tokens')
  async getAvailableTokens() {
    return this.tradeService.getAvailableTokens();
  }

  @Get('history/:walletAddress')
  async getTradeHistory(@Param('walletAddress') walletAddress: string) {
    return this.tradeService.getTradeHistory(walletAddress);
  }
}
