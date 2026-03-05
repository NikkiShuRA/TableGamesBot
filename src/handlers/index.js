const startHandler = require('./start');
const helpHandler = require('./help');
const commandRegistry = require('./registry');

function createCommandObject(trigger, handler, description) {
    return {
        trigger: trigger,
        handler: handler,
        description: description
    }
}

function setupHandlers(bot) {
    commandRegistry.setup(
        bot,
        [
            createCommandObject("start", startHandler, "Команда старта"),
            createCommandObject("help", helpHandler, "Список команд"),
        ]
    );
}

module.exports = { setupHandlers };