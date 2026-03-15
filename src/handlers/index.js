import startHandler from './start.js';
import helpHandler from './help.js';
import commandRegistry from '../registry.js';

/**
 * Создаёт объект команды с заданными параметрами.
 *
 * @param {string} trigger триггер команды.
 * @param {function} handler функция обработчик команды.
 * @param {string} description описание команды.
 * @return {object} объект команды.
 */
function createCommandObject(trigger, handler, description) {
    return {
        trigger: trigger,
        handler: handler,
        description: description
    }
}

/**
 * Настраивает обработчики команд для бота.
 *
 * @param {object} bot объект бота, для которого настраиваются обработчики.
 */
function setupHandlers(bot) {
    commandRegistry.setup(
        bot,
        [
            createCommandObject("start", startHandler, "Команда старта"),
            createCommandObject("help", helpHandler, "Список команд"),
        ]
    );
}

export default setupHandlers;