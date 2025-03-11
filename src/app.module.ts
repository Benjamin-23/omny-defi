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
// import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
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
  providers: [AuthService, UserService],
  controllers: [AuthController, UserController],
})
export class AppModule {}
