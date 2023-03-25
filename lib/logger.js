const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json, printf, colorize } = format;
const printFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});
const logger = createLogger({
    exitOnError: false,
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        printFormat,
        colorize()
    ),
    transports: [
        new transports.File({ filename: './log/errors.log', level: 'error' }),
        new transports.File({ filename: './log/server.log', level: 'debug' })
    ],
});
logger.add(new transports.Console({
    format: printFormat,
    level: 'debug'
}));
module.exports = { logger };