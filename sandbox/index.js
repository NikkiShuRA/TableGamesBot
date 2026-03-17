function testFunc () {
    trigger: 'help1';
    description: 'Список команд';
    const trigger = 'help2';
}
testFunc.trigger = 'help3';

console.log(testFunc.trigger);