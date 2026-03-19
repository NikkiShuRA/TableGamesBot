class CommandRegistry {
    constructor(list = []) {
        this._list = list;
    }

    setup(bot, commands = []) {
        commands.forEach(cmd => this.add(bot, cmd));
    }

    add(bot, command) {
        if (this._list.find(cmd => cmd.trigger === command.trigger)) {
            throw new Error(`Команда с триггером ${command.trigger} уже зарегистрирована.`);
        }
        this._list.push(command);
        console.log(`Зарегистрирована команда ${command.trigger} - ${command.description} (${command.handler.name})`);
        bot.command(command.trigger, command.handler);
    }

    // сейчас команда удаляется только из реестра, но в самом боте остаётся.
    delete(trigger) {
        if (!this._list.find(cmd => cmd.trigger === trigger)) {
            throw new Error(`Команда с триггером ${trigger} не найдена.`);
        }
        this._list = this._list.filter(cmd => cmd.trigger !== trigger);
    }


    get all() {
        return [...this._list];
    }

    getInfoList() {
        return this._list.map(cmd => ({
            trigger: cmd.trigger,
            description: cmd.description
        }));
    }
}

export default new CommandRegistry();