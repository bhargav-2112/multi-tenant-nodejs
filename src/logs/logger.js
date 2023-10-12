const winston = require("winston");

/**
 * Options for winston logger, You need to log with `logger.info`, `logger.error`
 * in order to use this. currently its being logged in console.log
 */
const options = {
  file: {
    level: "info",
    filename: "./logs/app.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: true,
    colorize: true,
  },
};
winston.addColors({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    sql: 4,
    debug: 5,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "green",
    sql: "blue",
    debug: "gray",
  },
});
const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    // uncomment below line to save logs in file

    // new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
  exitOnError: false,
});

module.exports = logger;
