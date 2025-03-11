import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument, TaskType } from './schemas/task.schema';
import {
  TaskCompletion,
  TaskCompletionDocument,
} from './schemas/task-completion.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AirdropService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(TaskCompletion.name)
    private taskCompletionModel: Model<TaskCompletionDocument>,
    private userService: UserService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(createTaskDto);
    return newTask.save();
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskModel.find({ isActive: true }).exec();
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async getUserTasks(userId: string): Promise<any[]> {
    // Find all active tasks
    const tasks = await this.taskModel.find({ isActive: true }).exec();

    // Find all task completions for this user
    const taskCompletions = await this.taskCompletionModel
      .find({ user: userId })
      .populate('task')
      .exec();

    // Create a map of task completions by task ID
    const completionsMap = new Map(
      taskCompletions.map((completion) => [
        completion.task._id.toString(),
        completion,
      ]),
    );

    // Create combined response with tasks and their completion status
    return tasks.map((task) => {
      const completion = completionsMap.get(task._id.toString());

      return {
        _id: task._id,
        name: task.name,
        description: task.description,
        type: task.type,
        points: task.points,
        requiredActions: task.requiredActions,
        actionsCompleted: completion ? completion.actionsCompleted : 0,
        isCompleted: completion ? completion.isCompleted : false,
        completedAt: completion ? completion.completedAt : null,
        progress: completion
          ? (completion.actionsCompleted / task.requiredActions) * 100
          : 0,
      };
    });
  }

  async trackTaskAction(userId: string, taskType: TaskType): Promise<void> {
    // Find the relevant task
    const task = await this.taskModel
      .findOne({ type: taskType, isActive: true })
      .exec();
    if (!task) {
      return; // Silent fail - no active task of this type
    }

    // Find or create a task completion record
    let taskCompletion = await this.taskCompletionModel
      .findOne({
        user: userId,
        task: task._id,
      })
      .exec();

    if (!taskCompletion) {
      taskCompletion = new this.taskCompletionModel({
        user: userId,
        task: task._id,
        actionsCompleted: 0,
        isCompleted: false,
      });
    }

    // Update actions completed if not already completed
    if (!taskCompletion.isCompleted) {
      taskCompletion.actionsCompleted += 1;

      // Check if task is now completed
      if (taskCompletion.actionsCompleted >= task.requiredActions) {
        taskCompletion.isCompleted = true;
        taskCompletion.completedAt = new Date();

        // Award points to the user
        await this.userService.addOmnyPoints(userId, task.points);
      }

      await taskCompletion.save();
    }
  }

  async getUserAirdropSummary(userId: string): Promise<any> {
    // Get all completed tasks for the user
    const completedTasks = await this.taskCompletionModel
      .find({ user: userId, isCompleted: true })
      .populate('task')
      .exec();

    // Calculate total earned points
    const totalPoints = completedTasks.reduce(
      (sum, completion) => sum + completion.task.points,
      0,
    );

    // Get total tasks count
    const totalTasks = await this.taskModel.countDocuments({ isActive: true });

    // Get user data to see total OMNY points
    const user = await this.userService.findById(userId);

    return {
      totalCompletedTasks: completedTasks.length,
      totalTasks,
      completionPercentage: (completedTasks.length / totalTasks) * 100,
      earnedPoints: totalPoints,
      totalOmnyPoints: user.omnyPoints,
      estimatedOmnyTokens: user.omnyPoints / 100, // Example conversion rate
    };
  }
}
