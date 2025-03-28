import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Wallet extends Document {
  @Prop({ required: true, unique: true })
  address: string;

  @Prop({ required: true })
  chainId: number;

  @Prop({ required: true })
  walletType: string; // 'metamask', 'phantom', 'ton_crystal', etc.

  @Prop()
  lastConnected: Date;
}
export type WalletDocument = Wallet & Document;

export enum ChainType {
  ETHEREUM = 'ethereum',
  SOLANA = 'solana',
  TON = 'ton',
}
export const WalletSchema = SchemaFactory.createForClass(Wallet);
