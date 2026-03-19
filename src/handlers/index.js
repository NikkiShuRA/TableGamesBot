import commands from '#handlers/commands/index.js';
import commandRegistry from '#services/registries/commandsRegistry.js';

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