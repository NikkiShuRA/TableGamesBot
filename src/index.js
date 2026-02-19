require('dotenv').config();
const { Telegraf } = require('telegraf');
const config = require('./config');
const { setupHandlers } = require('./handlers');
const createTelegrafLogger = require('./middlewares/logger'); 

const bot = new Telegraf(config.token);

// Подключение middleware
bot.use(createTelegrafLogger({
    logMessageContent: true,
    slowThresholdMs: 500
}));

// Глобальный перехват ошибок (на случай, если middleware не смог обработать)
bot.catch((err, ctx) => {
    console.error(`Global error caught for update ${ctx?.update?.update_id}`, err);
});

// Подключение хендлеров
setupHandlers(bot);

// Запуск
bot.launch();
console.log('Бот успешно запущен');

// Обработка выхода
process.once('SIGINT', () => bot.stop('SIGINT')); // Ctrl + C
process.once('SIGTERM', () => bot.stop('SIGTERM')); // kill и т.д

