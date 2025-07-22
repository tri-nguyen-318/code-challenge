import z from "zod";
import {
  createTaskSchema,
  getTasksQuerySchema,
  updateTaskSchema,
} from "../schema";

export type GetTasksParams = z.infer<typeof getTasksQuerySchema>;
export type CreateTaskBody = z.infer<typeof createTaskSchema>;
export type UpdateTaskBody = z.infer<typeof updateTaskSchema>;
