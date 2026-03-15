import commandRegistry from '../registry.js';

/**
 * Возвращает приветственное сообщение для пользователя.
 *
 * @param {object} user объект пользователя, содержащий информацию о нём.
 * @return {string} приветственное сообщение для пользователя.
 */
function renderStartMessage(user) {
    try {
        const username = user?.username || 'Пользователь';
        const render = `Доброго времени суток, ${username}!`;
        return render;
    } catch (error) {
        console.error("Ошибка рендеринга /start message:", error);
        return "Произошла ошибка при формировании сообщения старта.";
    }
}

/**
 * Возвращает информационное сообщение для пользователя.
 *
 * @return {string} информационное сообщение для пользователя.
 */
function renderHelpMessage() {
    try {
        const header = "Список команд:\n";
        const commandList = commandRegistry.getList()
                .map(command => `/${command.trigger} - ${command.description}`)
                .join('\n');
        const render = header + commandList;
        return render;
    } catch (error) {
        console.error("Ошибка рендеринга /help message:", error);
        return "Произошла ошибка при формировании сообщения помощи.";
    }
}

export {
    renderStartMessage,
    renderHelpMessage
}