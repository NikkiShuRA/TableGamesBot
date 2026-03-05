const { getStartMessage } = require('../constants')

module.exports = async (ctx) => {
    const message = getStartMessage(ctx);
    await ctx.reply(message);
};