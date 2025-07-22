import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { validate } from "../middlewares";
import { createTaskSchema, idParamSchema, updateTaskSchema } from "../schema";

const router = Router();
const controller = new TaskController();

router.get("/", controller.getTasks);
router.get("/:id", validate(idParamSchema, "params"), controller.getTaskById);
router.post("/", validate(createTaskSchema), controller.createTask);
router.put(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateTaskSchema),
  controller.updateTask
);
router.delete("/:id", validate(idParamSchema, "params"), controller.deleteTask);

export default router;
