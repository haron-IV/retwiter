const { createLogger, format, transports } = require('winston');

const customFormat = format.printf(({ level, message, timestamp}) => {
    return `${timestamp} | ${level}: ${message}`;
});

const customFormatFile = format.printf(({ level, message, timestamp}) => {
    return `{timestamp: "${timestamp}", level: "${level}",  message: "${message}"}`;
});

const logger = createLogger({
    transports: [
        new transports.File({
            maxsize: 5120000,
            maxFiles: 20,
            filename: `logs/logs.log`,
            colorize: true,
            json: true,
            timestamp: true,
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD ( HH:mm:ss )'
                }),
                customFormatFile
            )
        }),
        new transports.Console({
            level: "debug",
            timestamp: true,
            format: format.combine(
                format.colorize(),
                format.timestamp({
                    format: 'YYYY-MM-DD ( HH:mm:ss )'
                }),
                customFormat
            )
        })
    ]
});


module.exports = { logger };