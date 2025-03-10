import { Module } from '@nestjs/common';
import { StakingController } from './staking.controller';
import { StakingService } from './staking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Stake, StakeSchema } from './schemas/stake.schema';
import { StakingPool, StakingPoolSchema } from './schemas/staking-pool.schema';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Stake.name, schema: StakeSchema },
      { name: StakingPool.name, schema: StakingPoolSchema },
    ]),
    WalletModule,
  ],
  controllers: [StakingController],
  providers: [StakingService],
})
export class StakingModule {}
