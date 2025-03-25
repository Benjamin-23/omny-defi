import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(process.env.MONGODB_URI),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
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
