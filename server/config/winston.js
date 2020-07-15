const path = require('path');
const winston = require('winston');

const options = {
    file: {
        level: 'info',
        filename: path.join(__dirname, '../logs/app.log'),
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: true,
        colorize: true,
    },
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
    ],
    exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
    write: function (message) {
        logger.info(message);
    },
};

module.exports = logger;
