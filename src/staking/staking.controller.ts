import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { StakingService } from './staking.service';
import { CreateStakeDto } from './dto/create-stake.dto';
import { WithdrawStakeDto } from './dto/withdraw-stake.dto';

@Controller('staking')
export class StakingController {
  constructor(private readonly stakingService: StakingService) {}

  @Get('pools')
  async getStakingPools() {
    return this.stakingService.getStakingPools();
  }

  @Post('stake')
  async createStake(@Body() createStakeDto: CreateStakeDto) {
    return this.stakingService.createStake(createStakeDto);
  }

  @Delete('unstake')
  async withdrawStake(@Body() withdrawStakeDto: WithdrawStakeDto) {
    return this.stakingService.withdrawStake(withdrawStakeDto);
  }

  @Get('user/:walletAddress')
  async getUserStakes(@Param('walletAddress') walletAddress: string) {
    return this.stakingService.getUserStakes(walletAddress);
  }

  @Get('rewards/:walletAddress')
  async getStakingRewards(@Param('walletAddress') walletAddress: string) {
    return this.stakingService.getStakingRewards(walletAddress);
  }
}
