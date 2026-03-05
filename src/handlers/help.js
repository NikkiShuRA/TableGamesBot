const { getHelpMessage } = require('../constants')
const commandRegistry = require('./registry');

module.exports = async (ctx) => {
    const helpList = commandRegistry.getList()
        .map(cmd => `/${cmd.trigger} - ${cmd.description}`)
        .join('\n');
    const message = getHelpMessage(ctx) + helpList;
    await ctx.reply(message);
};