import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AirdropService } from './airdrop.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TaskType } from './schemas/task.schema';

@Controller('airdrop')
export class AirdropController {
  constructor(private airdropService: AirdropService) {}

  // Admin endpoints (these would typically have an admin guard)
  @UseGuards(JwtAuthGuard)
  @Post('tasks')
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.airdropService.createTask(createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('tasks')
  getAllTasks() {
    return this.airdropService.getAllTasks();
  }

  // User endpoints
  @UseGuards(JwtAuthGuard)
  @Get('user-tasks')
  getUserTasks(@Request() req) {
    return this.airdropService.getUserTasks(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('summary')
  getUserAirdropSummary(@Request() req) {
    return this.airdropService.getUserAirdropSummary(req.user._id);
  }

  // Endpoints to track task actions (these would typically be called by other services)
  // In a real-world scenario, you'd probably implement this with events/messaging
  @UseGuards(JwtAuthGuard)
  @Post('track/:taskType')
  trackTaskAction(@Request() req, @Param('taskType') taskType: TaskType) {
    return this.airdropService.trackTaskAction(req.user._id, taskType);
  }
}
