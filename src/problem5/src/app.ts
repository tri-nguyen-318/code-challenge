import express from "express";
import swaggerUi from "swagger-ui-express";
import taskRoutes from "./routes/task.routes";
import notFoundRoutesHandlerMiddleware from "./middlewares/not-found-routes-handler.middleware";
import defaultErrorHandlerMiddleware from "./middlewares/default-error-handler.middleware";
import swaggerSpec from "./swagger";
import morgan from "morgan";
import logger from "./utils/logger";
import cors from "cors";
import compression from "compression";

const app = express();
const stream = {
  // Use the http severity
  write: (message: string) => logger.http(message.trim()),
};

const morganMiddleware = morgan("dev", { stream });

// Enable gzip compression for all responses
app.use(compression());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(morganMiddleware);

app.use(express.json());

app.use("/api/v1/tasks", taskRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Welcome to the Task API");
});

// Handle 404 Not Found
app.use(notFoundRoutesHandlerMiddleware);

// Handle other errors
app.use(defaultErrorHandlerMiddleware);

export default app;
