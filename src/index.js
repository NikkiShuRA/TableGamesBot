require('dotenv').config();
const { Bot } = require('grammy');
const config = require('./config');
const { setupHandlers } = require('./handlers');
const createTelegrafLogger = require('./middlewares/logger'); 

const bot = new Bot(config.token);

// Подключение middleware
bot.use(createTelegrafLogger());

// Настройка обработчиков
setupHandlers(bot);

// Запуск
bot.start();
console.log('Бот успешно запущен');

// Обработка выхода
process.once('SIGINT', () => bot.stop('SIGINT')); // Ctrl + C
process.once('SIGTERM', () => bot.stop('SIGTERM')); // kill и т.д

