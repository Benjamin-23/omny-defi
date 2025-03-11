import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  walletAddress: string;

  @Prop({ default: 0 })
  omnyPoints: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' }] })
  wallets: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
