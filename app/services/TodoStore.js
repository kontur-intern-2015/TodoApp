/**
 *  Сервис позволяет работать со списком задач
 * @constructor
 */
function TodoStore() {
    this.storageKey = 'todolist';
}

/**
 * Получить список всех задач, активные + выполненные
 */
TodoStore.prototype.getAll = function () {
    return JSON.parse(localStorage[this.storageKey] || '[]');
};

/**
 * Добавить задачу в список
 * @param todo
 */
TodoStore.prototype.add = function (todo) {
    if(!todo.title)
    {
        throw new Error("Заполните значение");
    }
    todo.completed = false;

    todo.id = this.$generateUniqueId();
    var allTodos = this.getAll();
    allTodos.push(todo);
    this.$save(allTodos);
};

/**
 * Удалить задачу из списка
 * @param todo
 */
TodoStore.prototype.remove = function (todo) {
    if(!todo.id){
        throw new Error('Нет ИД')
    }
    var allTodos = this.getAll();
    _.remove(allTodos, function(item){
        return item.id === todo.id;
    });
    this.$save(allTodos);
};

/**
 * Завершить выполнение
 * @param todo
 */
TodoStore.prototype.changeState = function (todo, state) {
    var allTodos = this.getAll();
    var todoItem = _.find(allTodos, function(t){
        return t.id === todo.id;
    });
    if(todoItem){
        todoItem.completed = state;
        this.$save(allTodos);
    }
};

/**
 * Очищает список задач
 */
TodoStore.prototype.clear = function () {
    this.$save([]);
};

TodoStore.prototype.$save = function (todos) {
    localStorage[this.storageKey] = JSON.stringify(todos);
};

TodoStore.prototype.$generateUniqueId = function () {
    // always start with a letter (for DOM friendlyness)
    var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
    do {
        // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
        var ascicode = Math.floor((Math.random() * 42) + 48);
        if (ascicode < 58 || ascicode > 64) {
            // exclude all chars between : (58) and @ (64)
            idstr += String.fromCharCode(ascicode);
        }
    } while (idstr.length < 32);
    return (idstr);
};
