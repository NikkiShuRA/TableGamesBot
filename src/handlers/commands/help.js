import { renderHelpMessage } from '#services/renders.js';
import CommandRegistry from '#services/registries/commandsRegistry.js';

const trigger = 'help';
const description = 'Список команд';

/**
 * Обрабатывает команду помощи и отправляет пользователю информационное сообщение.
 *
 * @param {object} ctx контекст обработчика, содержащий информацию о запросе.
 */
async function helpHandler (ctx) {
    try {
        const message = renderHelpMessage(CommandRegistry.getInfoList());
        await ctx.reply(message);
    } catch (error) {
        console.error("Ошибка в helpHandler:", error);
    }
}

export default {
    trigger: trigger,
    description: description,
    handler: helpHandler
};