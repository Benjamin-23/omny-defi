import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TradeModule } from './trade/trade.module';
import { StakingModule } from './staking/staking.module';
import { BridgeModule } from './bridge/bridge.module';
import { PoolModule } from './pool/pool.module';
import { MintModule } from './mint/mint.module';
import { AirdropModule } from './airdrop/airdrop.module';
import { WalletModule } from './wallet/wallet.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

// const url =
//   'mongodb+srv://Basil:qLuV0PDAUex7nHQe@cluster0.8zrhz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    WalletModule,
    TradeModule,
    StakingModule,
    BridgeModule,
    PoolModule,
    MintModule,
    AirdropModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
