const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    transports: [
        new transports.File({
            maxsize: 5120000,
            maxFiles: 20,
            filename: `logs/logs.log`
        }),
        new transports.Console({
            level: "debug",
            format: format.combine(format.colorize(), format.simple())
        })
    ]
});


module.exports = { logger };