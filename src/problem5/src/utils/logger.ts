import winston from "winston";

// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running env.

const LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// This method set the current severity based on
// the current env: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
// const level = () => ((devEnv || stagEnv) ? 'debug' : 'warn');

// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const COLORS = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "gray",
};

// Tell winston that you want to link the colors
// defined above to the severity levels.
winston.addColors(COLORS);

const FORMAT = winston.format.combine(
  // Add the message timestamp with the preferred format
  winston.format.timestamp(),
  // Define the format of the message showing the timestamp, the level and the message
  winston.format.printf(
    (info) => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`
  ),
  // Tell Winston that the logs must be colored
  winston.format.colorize({ all: true })
);

const TRANSPORTS = [new winston.transports.Console()];

// Create the logger instance that has to be exported
// and used to log messages.
const logger = winston.createLogger({
  level: "debug",
  levels: LEVELS,
  format: FORMAT,
  transports: TRANSPORTS,
});

export const errorLogger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
