module.exports = {
    getWelcomeMessage: (ctx) => {
        const username = ctx.from?.username || 'пользователь';
        return `Доброго времени суток, ${ctx.from?.username}!`;
    }
}