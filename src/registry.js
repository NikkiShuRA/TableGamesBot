class CommandRegistry {
    constructor() {
        this._list = [];
    }

    setup(bot, commands = []) {
        commands.forEach(cmd => this.add(bot, cmd));
    }

    add(bot, command) {
        try {
            if (this._list.find(cmd => cmd.trigger === command.trigger)) {
                throw new Error(`Команда с триггером ${command.trigger} уже зарегистрирована.`);
            }
            this._list.push(command);
            console.log(`Зарегистрирована команда ${command.trigger} - ${command.description} (${command.handler.name})`);
            bot.command(command.trigger, command.handler);
        } catch (error) {
            console.error(`Ошибка при регистрации команды ${command.trigger}:`, error);
        }
    }

    delete(trigger) {
        try {
            if (!this._list.find(cmd => cmd.trigger === trigger)) {
                throw new Error(`Команда с триггером ${trigger} не найдена.`);
            }
            this._list = this._list.filter(cmd => cmd.trigger !== trigger);
        } catch (error) {
            console.error(`Ошибка при удалении команды ${trigger}:`, error);
        }
    }

    getList() {
        return this._list.map(cmd => ({
            trigger: cmd.trigger,
            description: cmd.description
        }));
    }
}

export default new CommandRegistry();