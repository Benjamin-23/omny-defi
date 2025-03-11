import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirdropService } from './airdrop.service';
import { AirdropController } from './airdrop.controller';
import { Task, TaskSchema } from './schemas/task.schema';
import {
  TaskCompletion,
  TaskCompletionSchema,
} from './schemas/task-completion.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: TaskCompletion.name, schema: TaskCompletionSchema },
    ]),
    UserModule,
  ],
  controllers: [AirdropController],
  providers: [AirdropService],
})
export class AirdropModule {}
