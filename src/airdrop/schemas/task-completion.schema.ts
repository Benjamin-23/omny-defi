import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Task } from './task.schema';

export type TaskCompletionDocument = TaskCompletion & Document;

@Schema({ timestamps: true })
export class TaskCompletion {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true })
  task: Task;

  @Prop({ default: 0 })
  actionsCompleted: number;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop()
  completedAt: Date;
}

export const TaskCompletionSchema =
  SchemaFactory.createForClass(TaskCompletion);

// Create a compound index to ensure a user can only have one task completion record per task
TaskCompletionSchema.index({ user: 1, task: 1 }, { unique: true });
