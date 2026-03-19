/**
 * Класс для управления реестром пользователей.
 * Позволяет хранить, искать, добавлять и удалять пользователей по ID | Telegram ID.
 */
class UsersRegistry {
    #list;
    /**
     * Создает экземпляр реестра.
     * @param {Array} list - Начальный массив пользователей (необязательно).
     */
    constructor(list = []) {
        this.#list = list.map(user => (structuredClone(user)));
    }

    /**
     * Ищет индекс пользователя по его внутреннему ID.
     * @param {number} userId - Внутренний идентификатор пользователя.
     * @returns {number} Индекс в массиве или -1, если не найден.
     * @private
     */
    #findIndexById(userId) {
        return this.#list.findIndex(user => user.id === userId);
    }

    /**
     * Ищет индекс пользователя по его Telegram ID.
     * @param {number} userTgId - Идентификатор пользователя в Telegram.
     * @returns {number} Индекс в массиве или -1, если не найден.
     * @private
     */
    #findIndexByTgId(userTgId) {
        return this.#list.findIndex(user => user.tgId === userTgId);
    }

    /**
     * Универсальный поиск индекса без выброса ошибок.
     * @param {number} id - Идентификатор пользователя.
     * @param {string} type - Тип идентификатора (базовое значение 'id').
     * @private
     */
    #getRawIndex(id, type = 'id') {
        switch (type) {
            case 'id': 
                return this.#findIndexById(id);
            case 'tg': 
                return this.#findIndexByTgId(id);
            default: 
                throw new Error(`Неизвестный тип поиска: ${type}`);
        }
    }

    /**
     * Проверка наличия (возвращает true/false)
     * @param {number} id - Идентификатор пользователя.
     * @param {string} type - Тип идентификатора (базовое значение 'id').
     * @private
     */
    #inList(id, type = 'id') {
        return this.#getRawIndex(id, type) !== -1;
    }

    /**
     * Валидация индекса (возвращает индекс или кидает ошибку)
     * @param {number} id - Идентификатор пользователя.
     * @param {string} type - Тип идентификатора (базовое значение 'id').
     * @return {number} index пользователя.
     * @private
     */
    #getValidIndex(id, type = 'id') {
        const index = this.#getRawIndex(id, type);
        if (index === -1) {
            throw new Error(`Пользователь c ${type}: ${id} не найден.`);
        }
        return index;
    }

    /**
     * Добавляет одного пользователя или массив пользователей в реестр.
     * Проверяет уникальность ID и Telegram ID перед добавлением.
     * @param {Object|Array} input - Объект пользователя или массив объектов.
     */
    add(input) {
        if (!input || typeof input !== 'object') {
            throw new Error(`Неверный тип данных переданного элемента`);
        }

        if (Array.isArray(input)) {
            return input.forEach(user => this.add(user));
        }

        const newUser = input;
        if (this.#inList(newUser.id, 'id')) {
            throw new Error(`Пользователь c ID: ${newUser.id} уже существует.`);
        }
        if (this.#inList(newUser.tgId, 'tg')) {
            throw new Error(`Пользователь c telegramID: ${newUser.tgId} уже существует.`);
        }

        this.#list.push(structuredClone(newUser));
    }

    /**
     * Удаляет пользователя из реестра по его внутреннему ID.
     * @param {number} userId - Внутренний ID для удаления.
     */
    deleteById(userId) {
        this.#list.splice(this.#getValidIndex(userId, 'id'), 1);
    }

    /**
     * Возвращает объект пользователя по его внутреннему ID.
     * @param {number} userId 
     * @returns {Object} Объект пользователя.
     */
    getUserById(userId) {
        const index = this.#getValidIndex(userId, 'id');
        return structuredClone(this.#list[index]);
    }

    /**
     * Возвращает объект пользователя по его Telegram ID.
     * @param {number} userTgId 
     * @returns {Object} Объект пользователя.
     */
    getUserByTgId(userTgId) {
        const index = this.#getValidIndex(userTgId, 'tg');
        return structuredClone(this.#list[index]);
    }

    /**
     * Возвращает копию всего списка пользователей.
     * Используется для защиты оригинальных данных от случайных изменений.
     * @returns {Array} Массив объектов пользователей.
     */
    get all() {
        return this.#list.map(user => (structuredClone(user)));
    }
}

export default new UsersRegistry();
export { UsersRegistry };