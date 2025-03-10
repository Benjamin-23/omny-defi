import { Module } from '@nestjs/common';
import { TradeController } from './trade.controller';
import { TradeService } from './trade.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Trade, TradeSchema } from './schemas/trade.schema';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trade.name, schema: TradeSchema }]),
    WalletModule,
  ],
  controllers: [TradeController],
  providers: [TradeService],
})
export class TradeModule {}
