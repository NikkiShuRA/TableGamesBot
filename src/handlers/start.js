import { renderStartMessage } from '../services/renders.js';

/**
 * Обрабатывает команду старта и отправляет пользователю приветственное сообщение.
 *
 * @param {object} ctx контекст обработчика, содержащий информацию о запросе.
 */
async function startHandler (ctx) {
    try {
        const message = renderStartMessage(ctx.from);
        await ctx.reply(message);
    } catch (error) {
        console.error("Ошибка в startHandler:", error);
    }
}

export default startHandler;