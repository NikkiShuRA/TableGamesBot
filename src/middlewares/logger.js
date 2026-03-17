import pino from 'pino';

/**
 * Создает middleware для логирования входящих сообщений с помощью библиотеки pino.
 * @param {object} options - Опции для настройки логгера pino.
 * @return {function} Middleware функция для логирования сообщений.
 */
function createLogger(options = {}) {
    const logger = pino({ level: process.env.LOG_LEVEL || 'info', ...options });
    return (ctx, next) => {
        logger.info({ from: ctx.from.username }, ctx.update.message.text); // Нужно переделать вывод
        return next();
    };
}

export default createLogger;