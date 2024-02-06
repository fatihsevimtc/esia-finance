const winston = require('winston');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

const logsDirectory = process.env.LOGS_DIRECTORY || 'log';
const logLevel = process.env.LOG_LEVEL || 'info';
const maxSize = parseInt(process.env.MAX_SIZE) || 10485760;  // 10 MB
const maxFiles = parseInt(process.env.MAX_FILES) || 5;
const logFormat = process.env.LOG_FORMAT || 'simple';
const timestampFormat = process.env.TIMESTAMP_FORMAT || 'YYYY-MM-DD HH:mm:ss';

const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp({ format: timestampFormat }),
    winston.format[logFormat]()  // Dynamically set log format based on LOG_FORMAT variable
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple()) }),
    new winston.transports.File({ 
      filename: path.join(logsDirectory, 'app.log'),
      maxsize: maxSize,
      maxFiles: maxFiles
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: path.join(logsDirectory, 'exceptions.log') })
  ]
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

module.exports = logger;
