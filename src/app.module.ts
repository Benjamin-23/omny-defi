import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletService } from './wallet/wallet.service';
import { WalletController } from './wallet/wallet.controller';
import { WalletModule } from './wallet/wallet.module';
import { TradeService } from './trade/trade.service';
import { TradeController } from './trade/trade.controller';
import { TradeModule } from './trade/trade.module';
import { StakingService } from './staking/staking.service';
import { StakingController } from './staking/staking.controller';
import { StakingModule } from './staking/staking.module';
import { BridgeService } from './bridge/bridge.service';
import { BridgeController } from './bridge/bridge.controller';
import { BridgeModule } from './bridge/bridge.module';
import { PoolService } from './pool/pool.service';
import { PoolController } from './pool/pool.controller';
import { PoolModule } from './pool/pool.module';
import { MintService } from './mint/mint.service';
import { MintController } from './mint/mint.controller';
import { MintModule } from './mint/mint.module';
import { AirdropService } from './airdrop/airdrop.service';
import { AirdropController } from './airdrop/airdrop.controller';
import { AirdropModule } from './airdrop/airdrop.module';

@Module({
  imports: [WalletModule, TradeModule, StakingModule, BridgeModule, PoolModule, MintModule, AirdropModule],
  controllers: [AppController, WalletController, TradeController, StakingController, BridgeController, PoolController, MintController, AirdropController],
  providers: [AppService, WalletService, TradeService, StakingService, BridgeService, PoolService, MintService, AirdropService],
})
export class AppModule {}
