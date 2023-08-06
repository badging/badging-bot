/**
 * Configurations of logger.
 */
const winston = require("winston");
const winstonRotator = require("winston-daily-rotate-file");
const fs = require("fs");
const path = require("path");

// Create logs directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, "../logs"))) {
  fs.mkdirSync(path.join(__dirname, "../logs"));
}

// Define log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Define transport options
const transportOptions = {
  file: {
    level: "info",
    filename: path.join(__dirname, "../logs/app.log"),
    handleExceptions: true,
    json: false,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
    format: winston.format.combine(winston.format.timestamp(), logFormat),
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  },
};

// Create logger instance
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(transportOptions.console),
    new winstonRotator(transportOptions.file),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

module.exports = logger;
