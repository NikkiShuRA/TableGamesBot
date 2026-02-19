const pino = require('pino');
const { performance } = require('perf_hooks');

function createTelegrafLogger(options = {}) {
    const {
        level = process.env.LOG_LEVEL === 'production' ? 'info' : 'debug',
        logMessageContent = process.env.LOG_LEVEL !== 'production',
        slowThresholdMs = 1000,
    } = options;

    const logger = pino({
        level,
        transport: process.env.LOG_LEVEL === 'production' ? undefined : {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:standard',
                ignore: 'pid,hostname',
            },
        },
    });

    return async (ctx, next) => {
        const traceId = ctx.update?.update_id?.toString() || `manual-${Date.now()}`;
        const start = performance.now();
        
        const baseLog = {
            trace_id: traceId,
            chat_id: ctx.chat?.id,
            user_id: ctx.from?.id,
            username: ctx.from?.username,
            update_type: ctx.updateType,
        };

        let replyMetrics = null;
        const originalReply = ctx.reply?.bind(ctx);
        
        if (originalReply) {
            ctx.reply = async (text, extra) => {
                const replyStart = performance.now();
                try {
                    const result = await originalReply(text, extra);
                    const duration = performance.now() - replyStart;
                    
                    replyMetrics = {
                        duration_ms: Number(duration.toFixed(2)),
                        success: true,
                        text_length: text?.length || 0
                    };

                    if (duration > slowThresholdMs) {
                        logger.warn({ ...baseLog, ...replyMetrics }, 'Slow reply detected');
                    }
                    
                    return result;
                } catch (err) {
                    replyMetrics = {
                        duration_ms: Number((performance.now() - replyStart).toFixed(2)),
                        success: false,
                        error: err.message
                    };
                    logger.error({ ...baseLog, ...replyMetrics }, 'Reply failed');
                    throw err;
                }
            };
        }

        let error = null;

        try {
            await next();
        } catch (err) {
            error = err;
            logger.error({
                ...baseLog,
                err: {
                    message: err.message,
                    stack: err.stack,
                    name: err.name
                }
            }, 'Handler error');
            throw err;
        } finally {
            const duration = performance.now() - start;
            const isSlow = duration > slowThresholdMs;
            
            const logData = {
                ...baseLog,
                duration_ms: Number(duration.toFixed(2)),
                status: error ? 'error' : 'success',
                reply: replyMetrics,
            };

            if (logMessageContent && ctx.message?.text) {
                logData.message_text = ctx.message.text;
            } else if (ctx.callbackQuery?.data) {
                logData.callback_data = ctx.callbackQuery.data;
            }

            if (error) {
                logger.error(logData, 'Request finished with error');
            } else if (isSlow) {
                logger.warn(logData, 'Request finished slowly');
            } else {
                logger.info(logData, 'Request finished');
            }
        }
    };
}

module.exports = createTelegrafLogger;