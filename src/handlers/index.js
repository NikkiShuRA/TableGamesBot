import commands from './commands/index.js';
import commandRegistry from '../registry.js';

/**
 * Настраивает обработчики команд для бота.
 *
 * @param {object} bot объект бота, для которого настраиваются обработчики.
 */
function setupHandlers(bot) {
    commandRegistry.setup(
        bot,
        commands
    );
}

export default setupHandlers;