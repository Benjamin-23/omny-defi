import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stake } from './schemas/stake.schema';
import { StakingPool } from './schemas/staking-pool.schema';
import { CreateStakeDto } from './dto/create-stake.dto';
import { WithdrawStakeDto } from './dto/withdraw-stake.dto';
import Web3 from 'web3';

@Injectable()
export class StakingService {
  private web3: Web3;

  constructor(
    @InjectModel(Stake.name) private stakeModel: Model<Stake>,
    @InjectModel(StakingPool.name) private stakingPoolModel: Model<StakingPool>,
  ) {
    this.web3 = new Web3(process.env.ETHEREUM_RPC_URL);
  }

  async getStakingPools() {
    // In a real implementation, you would fetch this from the blockchain
    // or from your database

    const pools = await this.stakingPoolModel.find().exec();

    if (pools.length === 0) {
      // If no pools exist, create some sample ones
      const samplePools = [
        {
          tokenSymbol: 'ETH',
          tokenName: 'Ethereum',
          tokenType: 'native',
          apy: 5.2,
          totalStaked: 1250.75,
          lockPeriod: 30, // Days
          stakingAddress: '0x123...', // Contract address
          minStake: 0.1,
        },
        {
          tokenSymbol: 'OMNY',
          tokenName: 'OMNY Token',
          tokenType: 'token',
          apy: 12.8,
          totalStaked: 28500,
          lockPeriod: 90, // Days
          stakingAddress: '0x456...', // Contract address
          minStake: 10,
        },
        // NFT staking pool example
        {
          tokenSymbol: 'OMNY-NFT',
          tokenName: 'OMNY NFT Collection',
          tokenType: 'nft',
          apy: 18.5,
          totalStaked: 42, // Number of NFTs
          lockPeriod: 180, // Days
          stakingAddress: '0x789...', // Contract address
          minStake: 1, // At least 1 NFT
        },
      ];

      await this.stakingPoolModel.insertMany(samplePools);
      return samplePools;
    }

    return pools;
  }

  async createStake(createStakeDto: CreateStakeDto) {
    const { poolId, amount, walletAddress } = createStakeDto;

    // Verify the pool exists
    const pool = await this.stakingPoolModel.findById(poolId);
    if (!pool) {
      throw new Error('Staking pool not found');
    }

    // In a real implementation, you would interact with the staking contract
    // to lock the user's tokens

    // For demo purposes, let's just record the stake
    const stake = new this.stakeModel({
      poolId,
      tokenSymbol: pool.tokenSymbol,
      amount,
      walletAddress,
      startDate: new Date(),
      endDate: new Date(Date.now() + pool.lockPeriod * 24 * 60 * 60 * 1000),
      apy: pool.apy,
      status: 'active',
    });

    await stake.save();

    // Update the pool's total staked amount
    pool.totalStaked += parseFloat(amount.toString());
    await pool.save();

    return {
      id: stake._id,
      status: 'active',
      message: 'Stake created successfully',
    };
  }

  async withdrawStake(withdrawStakeDto: WithdrawStakeDto) {
    const { stakeId, walletAddress } = withdrawStakeDto;

    // Find the stake
    const stake = await this.stakeModel.findById(stakeId);
    if (!stake) {
      throw new Error('Stake not found');
    }

    // Verify the stake belongs to the wallet
    if (stake.walletAddress !== walletAddress) {
      throw new Error('Unauthorized withdrawal attempt');
    }

    // Check if the lock period has ended
    const now = new Date();
    if (now < stake.endDate) {
      throw new Error('Stake is still locked');
    }

    // In a real implementation, you would interact with the staking contract
    // to release the user's tokens and pay rewards

    // Update the stake status
    stake.status = 'withdrawn';
    stake.withdrawDate = now;
    await stake.save();

    // Update the pool's total staked amount
    const pool = await this.stakingPoolModel.findById(stake.poolId);
    if (pool) {
      pool.totalStaked -= parseFloat(stake.amount.toString());
      await pool.save();
    }

    return {
      id: stake._id,
      status: 'withdrawn',
      message: 'Stake withdrawn successfully',
    };
  }

  async getUserStakes(walletAddress: string) {
    return this.stakeModel.find({ walletAddress }).exec();
  }

  async getStakingRewards(walletAddress: string) {
    // Find all active stakes for the user
    const stakes = await this.stakeModel
      .find({
        walletAddress,
        status: 'active',
      })
      .exec();

    // Calculate rewards for each stake
    const rewards = stakes.map((stake) => {
      const now = new Date();
      const startDate = new Date(stake.startDate);

      // Calculate days staked
      const daysStaked = Math.floor(
        (now.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000),
      );

      // Calculate rewards based on APY
      // Formula: amount * (apy/100) * (daysStaked/365)
      const reward =
        parseFloat(stake.amount.toString()) *
        (stake.apy / 100) *
        (daysStaked / 365);

      return {
        stakeId: stake._id,
        tokenSymbol: stake.tokenSymbol,
        stakedAmount: stake.amount,
        startDate: stake.startDate,
        endDate: stake.endDate,
        daysStaked,
        apy: stake.apy,
        accruedReward: reward,
      };
    });

    // Calculate total rewards
    const totalReward = rewards.reduce(
      (sum, item) => sum + item.accruedReward,
      0,
    );

    return {
      stakes: rewards,
      totalReward,
    };
  }
}
