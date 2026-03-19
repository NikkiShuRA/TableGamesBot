import { describe, expect, jest, test } from '@jest/globals';
import { 
    renderStartMessage,
    renderHelpMessage
 } from '#services/renders.js'

describe('Логика работы модуля renders', () => {
    describe('Логика работы рендера start', () => {
        const defaultMessage = 'Доброго времени суток, Пользователь!';

        test('должен корректно подставить username пользователя', () => {
            const user = { username: "Alex" };
            const result = renderStartMessage(user);
            expect(result).toBe('Доброго времени суток, Alex!');
        });
        test('должен корректно подставить "Пользователь" при пустом username пользователя', () => {
            const user = { username: "" };
            const result = renderStartMessage(user);
            expect(result).toBe(defaultMessage); 
        });
        test('должен корректно подставить "Пользователь" при отсутствии поля username объекта пользователя', () => {
            const user = { };
            const result = renderStartMessage(user);
            expect(result).toBe(defaultMessage); 
        });
        test('должен корректно подставить "Пользователь" при переданном значении не являющимся объектом', () => {
            const user = 123;
            const result = renderStartMessage(user);
            expect(result).toBe(defaultMessage); 
        });
        test('должен корректно подставить "Пользователь" при отсутствия переданого объекта пользователя', () => {
            const result = renderStartMessage(null);
            expect(result).toBe(defaultMessage); 
        }); 
    });

    describe('Логика работы рендера help', () => {
        const header = 'Список команд:\n';
        const defaultList = 'Тут пусто';
        test('должен корректно вывести список команд', () => {
            const createCommandObject = (trigger, description) => ({trigger: trigger, description: description});
            const commands = [
                createCommandObject('start', 'Команда старта'),
                createCommandObject('help', 'Команда помощи'),
                createCommandObject('any', 'Команда ...')
            ];
            const result = renderHelpMessage(commands);
            expect(result).toBe(header + '/start - Команда старта\n/help - Команда помощи\n/any - Команда ...');
        });
        test('должен вывести сообщение по умолчанию, если команд нет', () => {
            const result = renderHelpMessage([]);
            expect(result).toBe(header + defaultList);
        });
        test('должен вывести сообщение по умолчанию, если параметр не передан', () => {
            const result = renderHelpMessage(null);
            expect(result).toBe(header + defaultList); 
        });        
        test('не должен падать, если у команды отсутствует описание', () => {
            const commands = [{ trigger: 'test' }];
            const result = renderHelpMessage(commands);
            expect(result).toContain(header +'/test - Описание отсутствует'); 
        });
        test('не должен падать, если у команды отсутствует триггер', () => {
            const commands = [{ description: 'Test' }];
            const result = renderHelpMessage(commands);
            expect(result).toContain(header +'Триггер отсутствует - Test'); 
        });
    });
});