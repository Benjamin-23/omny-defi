import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class StakingPool extends Document {
  @Prop({ required: true })
  tokenSymbol: string;

  @Prop({ required: true })
  tokenName: string;

  @Prop({ required: true })
  tokenType: string; // native, token, nft

  @Prop({ required: true })
  apy: number;

  @Prop({ required: true, default: 0 })
  totalStaked: number;

  @Prop({ required: true })
  lockPeriod: number; // in days

  @Prop({ required: true })
  stakingAddress: string; // contract address

  @Prop({ required: true })
  minStake: number;
}

export const StakingPoolSchema = SchemaFactory.createForClass(StakingPool);
