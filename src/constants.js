module.exports = {
    getStartMessage: (ctx) => {
        const username = ctx.from?.username || 'пользователь';
        return `Доброго времени суток, ${username}!`;
    },
    getHelpMessage: (ctx) => {
        const header = "Список команд:\n";
        return header;
    }
}