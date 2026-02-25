const startHandler = require('./start');

function setupHandlers(bot) {
    bot.command("start", startHandler);
}

module.exports = { setupHandlers };