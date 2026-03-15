import { renderHelpMessage } from '../services/renders.js';

/**
 * Обрабатывает команду помощи и отправляет пользователю информационное сообщение.
 *
 * @param {object} ctx контекст обработчика, содержащий информацию о запросе.
 */
async function helpHandler (ctx) {
    const message = renderHelpMessage();
    await ctx.reply(message);
}

export default helpHandler;