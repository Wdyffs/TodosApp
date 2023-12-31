import { ETodoAction, ITodosState, todosReducer } from "./todo.reducer";

const initialState: ITodosState = {
    todos: [],
    filter: 'all'
}

function addTodo(prevState: ITodosState, todoText: string): ITodosState {
    return todosReducer(prevState, { type: ETodoAction.ADD_TODO, payload: todoText });
}

describe('Todo reducer', () => {

    test('Add todo action is correct', () => {
        const newTodoText = "text";
        const firstResult = addTodo(initialState, newTodoText);
        expect(firstResult.todos.length).toBe(1);
        expect(firstResult.todos[0].text).toBe(newTodoText);

        const secondResult = addTodo(firstResult, 'text2');
        expect(secondResult.todos.length).toBe(2);
    });

    test('Remove todo action is correct', () => {
        const state = addTodo(initialState, 'text');
        const todoId = state.todos[0].id;
        const res = todosReducer(state, {type: ETodoAction.REMOVE_TODO, payload: todoId});
        expect(res.todos.length).toBe(0);
    });

    test('Toggle todo action is correct', () => {
        const state = addTodo(initialState, 'text');
        const todo = state.todos[0];
        expect(todo.isCompleted).not.toBeTruthy();
        
        const res = todosReducer(state, {type: ETodoAction.TOGGLE_TODO, payload: todo.id});
        const toggledTodo = res.todos[0];
        expect(toggledTodo.isCompleted).toBeTruthy();
    });

    test('Change filter action is correct', () => {
        const activeFilterRes = todosReducer(initialState, {type: ETodoAction.SET_ACTIVE_FILTER});
        expect(activeFilterRes.filter).toBe('active');

        const allFilterRes = todosReducer(activeFilterRes, {type: ETodoAction.SET_ALL_FILTER});
        expect(allFilterRes.filter).toBe('all');

        const completedFilterRes = todosReducer(allFilterRes, {type: ETodoAction.SET_COMPLETED_FILTER});
        expect(completedFilterRes.filter).toBe('completed');
    });

    test('Remove completed action works correct', () => {
        const res1 = addTodo(initialState, 'text1');
        const res2 = addTodo(res1, 'text2');
        const res3 = todosReducer(res2, {type: ETodoAction.TOGGLE_TODO, payload: res2.todos[1].id});
        const res4 = todosReducer(res3, {type: ETodoAction.REMOVE_COMPLETED});
        expect(res4.todos.length).toBe(1);
        expect(res4.todos[0].isCompleted).not.toBeTruthy();
    })

})