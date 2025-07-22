import { Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { title } from "process";
import { StatusCodes } from "http-status-codes";
import { getTasksQuerySchema } from "../schema";
import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found-error";

const taskService = new TaskService();

export class TaskController {
  async getTasks(req: Request, res: Response) {
    const result = getTasksQuerySchema.safeParse(req.query);

    if (!result.success) {
      throw new BadRequestError("Invalid query parameters");
    }

    const tasks = await taskService.getTasks(result.data);
    return res.status(StatusCodes.OK).json(tasks);
  }

  async getTaskById(req: Request, res: Response) {
    const id = req.params.id;
    const task = await taskService.getTaskById(id);
    if (!task) {
      throw new NotFoundError(`Task with ID ${id} not found`);
    }
    res.status(StatusCodes.OK).json(task);
  }

  async createTask(req: Request, res: Response) {
    const body = req.body;
    const task = await taskService.createTask(body);
    res.status(StatusCodes.CREATED).json(task);
  }

  async updateTask(req: Request, res: Response) {
    const id = req.params.id;
    const body = req.body;
    const task = await taskService.updateTask(id, body);
    res.status(StatusCodes.OK).json(task);
  }

  async deleteTask(req: Request, res: Response) {
    const id = req.params.id;
    await taskService.deleteTask(id);
    res
      .status(StatusCodes.NO_CONTENT)
      .json({ message: "Task deleted successfully" });
  }
}
