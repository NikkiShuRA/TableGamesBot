
class CommandRegistry {
    constructor() {
        this._list = [];
    }

    setup(bot, commands = []) {
        this._list = commands.map(cmd => {
            console.log(`Зарегистрирована команда ${cmd.trigger} (${cmd.handler.name})`);
            bot.command(cmd.trigger, cmd.handler);
            return cmd;
        });
    }

    getList() {
        return this._list.map(cmd => ({
            trigger: cmd.trigger,
            description: cmd.description
        }));
    }
};

module.exports = new CommandRegistry();