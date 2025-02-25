const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
require("dotenv").config();

const logLevels = {
    levels: { error: 0, warn: 1, info: 2, http: 3, debug: 4 },
    colors: { error: "red", warn: "yellow", info: "green", http: "magenta", debug: "blue" },
};

winston.addColors(logLevels.colors);


const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message, service, ...meta }) =>
        `${timestamp} [${level}] [${service || "unknown"}]: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
        }`
    )
);


const fileFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message, service, ...meta }) =>
        `${timestamp} [${level}] [${service || "unknown"}]: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
        }`
    )
);

// const createRotatingFileTransport = (serviceName) => {
//     return new DailyRotateFile({
//         dirname: "logs",
//         filename: `${serviceName}-%DATE%.log`,
//         datePattern: "YYYY-MM-DD",
//         maxSize: "10m",
//         maxFiles: "30d",
//         zippedArchive: true,
//         format: fileFormat,
//     });
// };

const createLogger = (serviceName) => {
    return winston.createLogger({
        levels: logLevels.levels,
        defaultMeta: { service: serviceName },
        transports: [
            new winston.transports.Console({
                level: process.env.NODE_ENV === "production" ? "info" : "debug",
                handleExceptions: true,
                format: consoleFormat,
            }),
            // createRotatingFileTransport(serviceName),
        ],
        exitOnError: false,
    });
};

module.exports = createLogger;
