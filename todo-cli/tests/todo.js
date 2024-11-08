// __tests__/todo.js

const todoList = require('../todo');

describe("Todo List Tests", () => {
    let todos;

    beforeEach(() => {
        todos = todoList();
    });

    test("should add a new todo", () => {
        todos.add({ title: "Test new todo", dueDate: "2024-11-04", completed: false });
        expect(todos.all.length).toBe(1);
        expect(todos.all[0].title).toBe("Test new todo");
    });

    test("should mark a todo as completed", () => {
        todos.add({ title: "Complete this", dueDate: "2024-11-04", completed: false });
        todos.markAsComplete(0);
        expect(todos.all[0].completed).toBe(true);
    });

    test("should retrieve overdue items", () => {
        const yesterday = "2024-11-03";
        todos.add({ title: "Overdue task", dueDate: yesterday, completed: false });
        const overdue = todos.overdue();
        expect(overdue.length).toBe(1);
        expect(overdue[0].title).toBe("Overdue task");
    });

    test("should retrieve due today items", () => {
        const today = "2024-11-04";
        todos.add({ title: "Today's task", dueDate: today, completed: false });
        const dueToday = todos.dueToday();
        expect(dueToday.length).toBe(1);
        expect(dueToday[0].title).toBe("Today's task");
    });

    test("should retrieve due later items", () => {
        const tomorrow = "2024-11-05";
        todos.add({ title: "Future task", dueDate: tomorrow, completed: false });
        const dueLater = todos.dueLater();
        expect(dueLater.length).toBe(1);
        expect(dueLater[0].title).toBe("Future task");
    });
});
