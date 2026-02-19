const startHandler = require('./start');

function setupHandlers(bot) {
    bot.start(startHandler);
}

module.exports = { setupHandlers };