const { createLogger, format, transports } = require('winston');

const customFormat = format.printf(({ level, message, label, timestamp}) => {
    return `${timestamp} | ${level}: ${message}`;
});

const logger = createLogger({
    transports: [
        new transports.File({
            maxsize: 5120000,
            maxFiles: 20,
            filename: `logs/logs.log`,
            colorize: true,
            json: true,
            timestamp: true
        }),
        new transports.Console({
            level: "debug",
            timestamp: true,
            format: format.combine(
                format.colorize(),
                format.timestamp(),
                customFormat
            )
        })
    ]
});


module.exports = { logger };