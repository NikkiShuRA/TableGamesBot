import 'dotenv/config';
import { Bot } from 'grammy';
import config from './config.js';
import setupHandlers from './handlers/index.js';
import createLogger from './middlewares/logger.js'; 

try {
    if (!config.token) {
        throw new Error("Токен бота не найден. Пожалуйста, проверьте файл .env и убедитесь, что переменная BOT_TOKEN установлена.");
    }
} catch (error) {
    console.error("Ошибка при загрузке конфигурации:", error);
    process.exit(1);
}

const bot = new Bot(config.token);

// Подключение middleware
bot.use(createLogger());

// Настройка обработчиков
setupHandlers(bot);

// Запуск
bot.start();
console.log('Бот успешно запущен');

// Обработка выхода
process.once('SIGINT', () => bot.stop('SIGINT')); // Ctrl + C
process.once('SIGTERM', () => bot.stop('SIGTERM')); // kill и т.д

