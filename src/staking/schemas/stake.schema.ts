import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Stake extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'StakingPool',
    required: true,
  })
  poolId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  tokenSymbol: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  walletAddress: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop()
  withdrawDate: Date;

  @Prop({ required: true })
  apy: number;

  @Prop({ default: 'active' })
  status: string; // active, withdrawn, expired
}

export const StakeSchema = SchemaFactory.createForClass(Stake);
