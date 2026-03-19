import { renderStartMessage } from '#services/renders.js';

const trigger = 'start';
const description = 'Команда старта';

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

export default {
    trigger: trigger,
    description: description,
    handler: startHandler
};