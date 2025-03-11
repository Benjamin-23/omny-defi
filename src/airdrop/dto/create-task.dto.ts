import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { TaskType } from '../schemas/task.schema';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(TaskType)
  type: TaskType;

  @IsNumber()
  @Min(1)
  points: number;

  @IsNumber()
  @Min(1)
  requiredActions: number;
}
