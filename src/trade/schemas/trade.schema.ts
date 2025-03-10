import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Trade extends Document {
  @Prop({ required: true })
  fromToken: string;

  @Prop({ required: true })
  toToken: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  walletAddress: string;

  @Prop({ default: 'pending' })
  status: string; // pending, completed, failed

  @Prop()
  txHash: string;

  @Prop()
  receivedAmount: number;
}
export const TradeSchema = SchemaFactory.createForClass(Trade);
