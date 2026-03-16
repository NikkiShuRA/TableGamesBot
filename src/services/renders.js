/**
 * Возвращает приветственное сообщение для пользователя.
 *
 * @param {object} user объект пользователя, содержащий информацию о нём.
 * @return {string} приветственное сообщение для пользователя.
 */
function renderStartMessage(user) {
    const username = user?.username || 'Пользователь';
    const render = `Доброго времени суток, ${username}!`;
    return render;
}

/**
 * Возвращает информационное сообщение для пользователя.
 *
 * @return {string} информационное сообщение для пользователя.
 */
function renderHelpMessage(commands = []) {
    const header = "Список команд:\n";
    const commandList = (commands && commands.length > 0) 
        ? commands.map(command => {
            const trigger = command.trigger ? `/${command.trigger}` : 'Триггер отсутствует';
            const description = command.description || 'Описание отсутствует';
            return `${trigger} - ${description}`;
        }).join('\n')
        : 'Тут пусто';
    const render = header + commandList;
    return render;
}

export {
    renderStartMessage,
    renderHelpMessage
}