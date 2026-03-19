import { describe, expect, test, beforeEach } from '@jest/globals';
import { UsersRegistry } from "#services/registries/usersRegistry.js";

describe('UsersRegistry (Senior+++ Suite)', () => {
    
    // Фабрика данных для чистоты тестов
    const getMockUsers = () => [
        { id: 1, tgId: 101, name: 'Alex' },
        { id: 2, tgId: 102, name: 'Ivan' }
    ];

    describe('Конструктор и инициализация', () => {
        test('Должен создавать пустой реестр по умолчанию', () => {
            const registry = new UsersRegistry();
            expect(registry.all).toEqual([]);
        });

        test('Должен клонировать начальные данные (разрыв связи)', () => {
            const data = getMockUsers();
            const registry = new UsersRegistry(data);
            
            data[0].name = 'Hacked';
            expect(registry.getUserById(1).name).toBe('Alex');
        });
    });

    describe('Метод add()', () => {
        let registry;
        beforeEach(() => {
            registry = new UsersRegistry();
        });

        test('Успешное добавление одиночного объекта', () => {
            registry.add({ id: 5, tgId: 505, name: 'Kira' });
            expect(registry.all.length).toBe(1);
            expect(registry.getUserById(5).name).toBe('Kira');
        });

        test('Успешное добавление массива объектов', () => {
            registry.add(getMockUsers());
            expect(registry.all.length).toBe(2);
        });

        test('Бросает ошибку при дубликате ID', () => {
            registry.add({ id: 1, tgId: 101, name: 'First' });
            expect(() => {
                registry.add({ id: 1, tgId: 999, name: 'Second' });
            }).toThrow('Пользователь c ID: 1 уже существует.');
        });

        test('Бросает ошибку при дубликате tgId', () => {
            registry.add({ id: 1, tgId: 101, name: 'First' });
            expect(() => {
                registry.add({ id: 2, tgId: 101, name: 'Second' });
            }).toThrow('Пользователь c telegramID: 101 уже существует.');
        });

        test('Бросает ошибку при неверном типе данных', () => {
            expect(() => registry.add(null)).toThrow('Неверный тип данных');
            expect(() => registry.add(123)).toThrow('Неверный тип данных');
        });
    });

    describe('Методы получения данных', () => {
        let registry;
        beforeEach(() => {
            registry = new UsersRegistry(getMockUsers());
        });

        test('getUserById возвращает глубокую копию', () => {
            const user = registry.getUserById(1);
            user.name = 'Changed';
            expect(registry.getUserById(1).name).toBe('Alex');
        });

        test('getUserByTgId возвращает глубокую копию', () => {
            const user = registry.getUserByTgId(102);
            expect(user.id).toBe(2);
            user.id = 999;
            expect(registry.getUserByTgId(102).id).toBe(2);
        });

        test('Бросает ошибку, если пользователь не найден', () => {
            expect(() => registry.getUserById(999)).toThrow('Пользователь c id: 999 не найден.');
            expect(() => registry.getUserByTgId(999)).toThrow('Пользователь c tg: 999 не найден.');
        });
    });

    describe('Метод deleteById()', () => {
        let registry;
        beforeEach(() => {
            registry = new UsersRegistry(getMockUsers());
        });

        test('Успешное удаление', () => {
            registry.deleteById(1);
            expect(registry.all.length).toBe(1);
            expect(() => registry.getUserById(1)).toThrow();
        });

        test('Бросает ошибку при удалении несуществующего', () => {
            expect(() => registry.deleteById(999)).toThrow('Пользователь c id: 999 не найден.');
        });
    });

    describe('Безопасность (Геттер all)', () => {
        test('all возвращает глубокую копию массива', () => {
            const registry = new UsersRegistry(getMockUsers());
            const list = registry.all;
            
            // 1. Проверяем защиту структуры массива
            const listForLengthTest = registry.all;
            listForLengthTest.length = 0; 
            expect(registry.all.length).toBe(2); // Оригинал не изменился

            // 2. Проверяем защиту объектов внутри (Глубокое клонирование)
            list[0].name = 'Hacker'; 
            // В реестре имя должно остаться прежним ('Alex')
            expect(registry.getUserById(1).name).toBe('Alex');
        });
    });
});
