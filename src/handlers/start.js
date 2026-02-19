const { getWelcomeMessage } = require('./../constants')

module.exports = (ctx) => {
    const message = getWelcomeMessage(ctx);
    ctx.reply(message);
};