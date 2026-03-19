/**
* Класс пользователей
*/
class User {
    static #counter = 0;
    constructor({tgId, name}) {
        this.id = User.#counter++;
        this.tgId = tgId;
        this.name = name;
    }
}

/**
* Класс реестра пользователей
*/
class UsersRegistry {
    constructor() {
        this._list = [];
    }

    /**
    * Ищет определённого пользователя в реестре пользователей по ID
    * @param {number} userId ID пользователя
    * @return {number} index найденого пользователя в реестре пользователей, в противном случае -1
    */
    findIndexById(userId) {
        return this._list.findIndex(user => user.id === userId);
    }

    /**
    * Ищет определённого пользователя в реестре пользователей по telegramID
    * @param {number} userTgId telegramID пользователя
    * @return {number} index найденого пользователя в реестре пользователей, в противном случае -1
    */
    findIndexByTgId(userTgId) {
        return this._list.findIndex(user => user.tgId === userTgId);
    }

    /**
    * Добавляет определённого пользователя в реестр пользователей
    * @param {User} newUser объект пользователя
    */
    add(newUser) {
        if (this.findIndexById(newUser.id) !== -1) {
            throw new Error(`Пользователь c ID: ${newUser.id} уже существует.`);
        }
        if (this.findIndexByTgId(newUser.tgId) !== -1) {
            throw new Error(`Пользователь c telegramID: ${newUser.tgId} уже существует.`);
        }
        this._list.push(newUser);
    }

    /**
    * Удаляет определённого пользователя из реестра пользователей
    * @param {number} userId ID пользователя
    */
    deleteById(userId) {
        const initialLength = this._list.length;
        const foundIndex = this.findIndexById(userId);
        if (foundIndex === -1) {
            throw new Error(`Пользователь c ID: ${userId} не найден.`)
        }
        this._list.splice(foundIndex, 1);
        if (this._list.length === initialLength) {
            throw new Error(`Что-то пошло не так при удалении.`)
        }
    }

    /**
    * Возвращает копию листа пользователей из реестра пользователей
    * @return {Array} копия листа пользователей
    */
    get all() {
        return [...this._list];
    }
}

function getUsersReg() {
    for (const user of usersRegistry.all) {
        console.log(`ID: ${user.id} | Name: ${user.name}`);
    }
}

const usersRegistry = new UsersRegistry;

console.log(`Test add()`);
let testUsers = [
    {
        tgId: 100,
        name: 'Alex',
    },
    {
        tgId: 101,
        name: 'Ivan',
    }, 
    {
        tgId: 102,
        name: 'L',
    }, 
    {
        tgId: 103,
        name: 'Kira',
    },
    {
        tgId: 103,
        name: 'Kira',
    },
];
for (let user of testUsers) {
    try {
        usersRegistry.add(new User(user));
        console.log(`Пользователь успешо добавлен.`);
    } catch (error) {
        console.error("Не удалось добавить:", error.message);
    }
}

console.log(`Test deleteById()`);
let indexsTestDeleteById = [0, 100];
for (let i of indexsTestDeleteById) {
    try {
        usersRegistry.deleteById(i);
        console.log(`Пользователь успешо удалён.`);
    } catch (error) {
        console.error("Не удалось удалить:", error.message);
    }
}