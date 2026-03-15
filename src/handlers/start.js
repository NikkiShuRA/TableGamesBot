import { renderStartMessage } from '../services/renders.js';

/**
 * Обрабатывает команду старта и отправляет пользователю приветственное сообщение.
 *
 * @param {object} ctx контекст обработчика, содержащий информацию о запросе.
 */
async function startHandler (ctx) {
    const message = renderStartMessage(ctx.from);
    await ctx.reply(message);
}

export default startHandler;