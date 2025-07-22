import z from "zod";
import prisma from "../db/prisma.client";
import {
  createTaskSchema,
  getTasksQuerySchema,
  updateTaskSchema,
} from "../schema";
import {
  CreateTaskBody,
  GetTasksParams,
  UpdateTaskBody,
} from "../types/task.type";
import { NotFoundError } from "../errors/not-found-error";

export class TaskService {
  async getTasks({ completed, title, offset, limit }: GetTasksParams) {
    return prisma.task.findMany({
      where: {
        completed: completed ? completed === "true" : undefined,
        title: title ? { contains: title, mode: "insensitive" } : undefined,
      },
      skip: offset,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  }

  async getTaskById(id: string) {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundError("Task not found");
    return task;
  }

  async createTask(data: CreateTaskBody) {
    return prisma.task.create({ data });
  }

  async updateTask(id: string, data: UpdateTaskBody) {
    const existingTask = await prisma.task.findUnique({ where: { id } });
    if (!existingTask) throw new NotFoundError("Task not found");

    return prisma.task.update({ where: { id }, data });
  }

  async deleteTask(id: string) {
    const existingTask = await prisma.task.findUnique({ where: { id } });
    if (!existingTask) throw new NotFoundError("Task not found");

    await prisma.task.delete({ where: { id } });
    return { message: "Task deleted successfully" };
  }
}
