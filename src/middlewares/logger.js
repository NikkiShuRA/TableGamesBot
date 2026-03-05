const pino = require('pino');

function createTelegrafLogger(options = {}) {
    const logger = pino({ level: process.env.LOG_LEVEL || 'info', ...options });
    return (ctx, next) => {
        logger.info({ ctx }, 'incoming update');
        return next();
    };
}

module.exports = createTelegrafLogger;