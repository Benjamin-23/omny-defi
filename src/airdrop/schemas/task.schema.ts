import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

export enum TaskType {
  SWAP = 'swap',
  BRIDGE = 'bridge',
  STAKE = 'stake',
  TRANSFER = 'transfer',
  CREATE_POOL = 'create_pool',
  ADD_LIQUIDITY = 'add_liquidity',
  MINT_TOKEN = 'mint_token',
}

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: TaskType })
  type: TaskType;

  @Prop({ required: true })
  points: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ required: true })
  requiredActions: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
